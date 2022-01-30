using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MessageFormAngular.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(1000)]
        public string Text { get; set; } = string.Empty;
        
        public int TopicId { get; set; }
        public Topic Topic { get; set; }

        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }
}
