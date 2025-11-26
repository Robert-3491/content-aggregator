using Backend.Models.Requests;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DownloadController : ControllerBase
    {
        private readonly DownloadService _downloadService;

        public DownloadController(DownloadService downloadService)
        {
            _downloadService = downloadService;
        }

        [HttpPost]
        public async Task<IActionResult> Download([FromBody] DownloadRequest request)
        {
            if (string.IsNullOrEmpty(request.Url))
            {
                return BadRequest(new { message = "URL is required" });
            }

            try
            {
                await _downloadService.ExecuteDownload(request.Url, request.IsMovieSearch);
                return Ok(new { message = "Torrent added successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }


}