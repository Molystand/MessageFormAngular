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
    public class MessageController : ControllerBase
    {
        ApplicationContext db;
        public MessageController(ApplicationContext context)
        {
            db = context;
            //if (!db.Messages.Any())
            //{
            //    db.Messages.Add(new Message
            //    {
            //        Contact = db.Contacts.FirstOrDefault(c => c.Id == 1),
            //        Topic = db.Topics.FirstOrDefault(t => t.Id == 1),
            //        Text = "some text"
            //    });
            //    db.SaveChanges();
            //}
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> Get()
        {
            return await db.Messages.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> Get(int id)
        {
            var message = await db.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }
            return message;
        }

        [HttpPost]
        public async Task<ActionResult<Message>> Post(Message message)
        {
            if (message == null)
            {
                return BadRequest();
            }

            db.Messages.Add(message);
            await db.SaveChangesAsync();
            return Ok(message);
        }

        [HttpPut]
        public async Task<ActionResult<Message>> Put(Message message)
        {
            if (message == null)
            {
                return BadRequest();
            }
            if (!db.Messages.Any(m => m.Id == message.Id))
            {
                return NotFound();
            }

            db.Update(message);
            await db.SaveChangesAsync();
            return Ok(message);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Message>> Delete(int id)
        {
            Message message = db.Messages.FirstOrDefault(m => m.Id == id);
            if (message == null)
            {
                return NotFound();
            }

            db.Messages.Remove(message);
            await db.SaveChangesAsync();
            return Ok(message);
        }
    }
}
