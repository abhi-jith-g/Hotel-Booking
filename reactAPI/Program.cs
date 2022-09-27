var builder = WebApplication.CreateBuilder(args);


var app = builder.Build();






app.MapGet("/", () => {
    return new Room(){
        id=1,
        roomNumber=101,
        adultCapacity=4,
        childCapacity=3,
        price=30000
    };
});
app.Run();

class Room{
    public int id { get; set; }
    public int roomNumber { get; set; }
    public int adultCapacity { get; set; }
    public int childCapacity{ get; set; }
    public int price { get; set; }
}