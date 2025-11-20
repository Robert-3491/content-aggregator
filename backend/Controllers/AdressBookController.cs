using backend.Models.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdressBookController : ControllerBase
{
    private readonly AdressBookService _service;

    public AdressBookController(AdressBookService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<AdressBook?>> Get()
    {
        var item = await _service.GetAsync();
        return Ok(item ?? new AdressBook());
    }

    [HttpPost]
    public async Task<ActionResult<AdressBook>> AddOrUpdate(AdressBook adressBook)
    {
        var result = await _service.AddOrUpdateAsync(adressBook);
        return Ok(result);
    }
}