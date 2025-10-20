namespace Back.Model
{
    public class Post
    {
        public Guid PostId { get; set; }
        public string? Sender { get; set; }
        public  DateTime DatePosted { get; set; }
        public required string Text { get; set; }
        public string DatePostedFormatted => DatePosted.ToString("MMMM d, yyyy h:mm tt");

    }
}
