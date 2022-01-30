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
    public class TopicController : ControllerBase
    {
        ApplicationContext db;
        public TopicController(ApplicationContext context)
        {
            db = context;
            if (!db.Topics.Any())
            {
                db.Topics.Add(new Topic { Title = "Техподдержка" });
                db.Topics.Add(new Topic { Title = "Продажи" });
                db.Topics.Add(new Topic { Title = "Другое" });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> Get()
        {
            return await db.Topics.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> Get(int id)
        {
            var topic = await db.Topics.FindAsync(id);
            
            if (topic == null)
            {
                return NotFound();
            }
            return topic;
        }
    }
}
