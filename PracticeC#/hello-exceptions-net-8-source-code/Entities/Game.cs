namespace HelloExceptions.Entities;

public class Game(int id, string name, decimal price)
{
    public int Id { get; } = id;

    public string Name { get; } = name;

    public decimal Price { get; } = price;
}

