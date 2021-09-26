using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MouvementRepository : IMouvementRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public MouvementRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MouvementDto> AddMouvement(MouvementDto mouvement)
        {
            Mouvement NewMouvement = new Mouvement();
            var m = _mapper.Map(mouvement, NewMouvement);
            _context.Mouvement.Add(m);
            await _context.SaveChangesAsync();
            foreach (var id in mouvement.EquipementsId)
            {
                var _equipement_mouvement = new Equipement_Mouvement()
                {
                    MouvementId = m.Id,
                    EquipementId = id
                };
                await _context.Equipements_Mouvements.AddAsync(_equipement_mouvement);
                await _context.SaveChangesAsync();
            }
            mouvement.Id = m.Id;
            return mouvement;
        }

        public async Task<MouvementDto> GetMouvementByIdAsync(int id)
        {
            var m = await _context.Mouvement.Where(m => m.Id == id).ProjectTo<MouvementDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
            var Ids = _context.Equipements_Mouvements.Where(em => em.MouvementId == id).Select(em => em.EquipementId).ToList();
            m.EquipementsId = Ids;
            m.Equipements = new List<string>();
            foreach (var _id in Ids)
            {
                m.Equipements.Add(await _context.Equipements.Where(e => e.Id == _id).Select(e => e.CodeONE + '/' + e.SerieConstructeur).SingleOrDefaultAsync());
            }
            return m;
        }

        public async Task<IEnumerable<MouvementDto>> GetMouvementsAsync()
        {
            return await _context.Mouvement.ProjectTo<MouvementDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
        public async Task<MouvementDto> GetLastMouvement()
        {
            return await _context.Mouvement.ProjectTo<MouvementDto>(_mapper.ConfigurationProvider).OrderBy(m => m.NumeroMvt).LastOrDefaultAsync();
        }

        public async Task<bool> MvtExists(int code)
        {
            return await _context.Mouvement.AnyAsync(Mvt => Mvt.NumeroMvt == code);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(MouvementDto mouvement)
        {
            _context.Entry(mouvement).State = EntityState.Modified;
        }
    }
}