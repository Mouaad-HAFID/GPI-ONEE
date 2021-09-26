using System;
using System.Threading.Tasks;
using API.DTOs;
using Aspose.Words;
using Aspose.Words.Reporting;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace API.Controllers
{

    public class DocsController : BaseApiController
    {

        [HttpPost]
        public OkObjectResult GenerateDoc(MouvementDto mouvement)
        {
            try
            {
                Aspose.Words.Document doc = new Aspose.Words.Document("../API/Templates/Bon_Template.docx");
                ReportingEngine engine = new ReportingEngine();
                engine.BuildReport(doc, mouvement, "mouvement");
                string FileName = "../API/Bons/Bons_" + mouvement.NumeroMvt + "_" + mouvement.TypeMouvement + "_" + mouvement.DateMouvement.ToString("yyyyMMddHHmmss") + ".docx";
                doc.Save(FileName);

                RemoveHeadersAndFooters(FileName);

            }
            catch (System.Exception)
            {

                throw;
            }

            return Ok("Generated");
        }

        public static void RemoveHeadersAndFooters(string filename)
        {
            // Given a document name, remove all of the headers and footers
            // from the document.
            using (WordprocessingDocument doc =
                WordprocessingDocument.Open(filename, true))
            {
                // Get a reference to the main document part.
                var docPart = doc.MainDocumentPart;

                // Count the header and footer parts and continue if there 
                // are any.
                if (docPart.HeaderParts.Count() > 0 ||
                    docPart.FooterParts.Count() > 0)
                {
                    // Remove the header and footer parts.
                    docPart.DeleteParts(docPart.HeaderParts);
                    docPart.DeleteParts(docPart.FooterParts);

                    // Get a reference to the root element of the main
                    // document part.
                    DocumentFormat.OpenXml.Wordprocessing.Document document = docPart.Document;

                    // Remove all references to the headers and footers.

                    // First, create a list of all descendants of type
                    // HeaderReference. Then, navigate the list and call
                    // Remove on each item to delete the reference.
                    var headers =
                      document.Descendants<HeaderReference>().ToList();
                    foreach (var header in headers)
                    {
                        header.Remove();
                    }

                    // First, create a list of all descendants of type
                    // FooterReference. Then, navigate the list and call
                    // Remove on each item to delete the reference.
                    var footers =
                      document.Descendants<FooterReference>().ToList();
                    foreach (var footer in footers)
                    {
                        footer.Remove();
                    }

                    foreach (Text element in doc.MainDocumentPart.Document.Body.Descendants<Text>())
                    {
                        element.Text = element.Text.Replace(@"Evaluation Only. Created with Aspose.Words. Copyright 2003-2021 Aspose Pty Ltd.", "");
                    }

                    // Save the changes.
                    document.Save();
                }
            }
        }




    }
}