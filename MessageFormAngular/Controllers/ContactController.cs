using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MessageFormAngular.Models;

namespace MessageFormAngular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        ApplicationContext db;
        public ContactController(ApplicationContext context)
        {
            db = context;
            if (!db.Contacts.Any())
            {
                db.Contacts.Add(new Contact
                {
                    Email = "contact1@gmail.com",
                    Name = "user",
                    PhoneNumber = "+79991234455"
                });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> Get()
        {
            return await db.Contacts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> Get(int id)
        {
            var contact = await db.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }
            return contact;
        }

        [HttpGet]
        [Route("find")]
        public async Task<ActionResult<Contact>> Find([FromQuery]string email, [FromQuery]string phoneNumber)
        {
            if (email == null || phoneNumber == null)
            {
                return BadRequest();
            }

            var contact = await db.Contacts.FirstOrDefaultAsync(c => c.Email == email && c.PhoneNumber == phoneNumber);

            //if (contact == null)
            //{
            //    return NotFound();
            //}
            return contact;

        }

        [HttpPost]
        public async Task<ActionResult<Contact>> Post(Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }

            db.Contacts.Add(contact);
            await db.SaveChangesAsync();
            return Ok(contact);
        }

        [HttpPut]
        public async Task<ActionResult<Contact>> Put(Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }
            if (!db.Contacts.Any(c => c.Id == contact.Id))
            {
                return NotFound();
            }

            db.Update(contact);
            await db.SaveChangesAsync();
            return Ok(contact);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Contact>> Delete(int id)
        {
            Contact contact = db.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            db.Contacts.Remove(contact);
            await db.SaveChangesAsync();
            return Ok(contact);
        }
    }
}
