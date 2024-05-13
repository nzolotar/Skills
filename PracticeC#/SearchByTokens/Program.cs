namespace Solution;

public class Customer
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
}

public class SearchResult
{
    public Customer Customer { get; set; }
    public int Score { get; set; }
}

class Solution
{
    static void Main(string[] args)
    {
        using var stdinStream = Console.OpenStandardInput();
        using var stdin = new StreamReader(stdinStream);
        var lines = stdin.ReadToEnd().Split(Environment.NewLine)
            .Select(l =>
            {
                return l.Split(',');
            })
            .ToList();

        var weights = lines.Where(l => l[0] == "weight")
            .ToDictionary(x => x[1], x => int.Parse(x[2]));

        var customers = lines.Where(l => l[0] == "customer")
            .Select(l => new Customer
            {
                FirstName = l[1],
                LastName = l[2],
                Address = l[3]
            })
            .ToList();

        var searchString = lines.Where(l => l[0] == "search")
            .Select(l => l[1])
            .First();

        // perform the search
        var searchResults = Search(weights, customers, searchString);

        // display the results
        foreach (var result in searchResults)
        {
            Console.WriteLine($"{result.Customer.FirstName} {result.Customer.LastName} {result.Customer.Address} - Score: {result.Score}");
        }
    }

    static List<SearchResult> Search(Dictionary<string, int> weights, List<Customer> customers, string searchString)
    {
        var results = new List<SearchResult>();

        // TODO: Add your search implementation here
        throw new NotImplementedException();

        // return your results
        return results;
    }

    static List<string> TokenizeSearchString(string searchString)
    {
        // tokenize the search string
        return searchString.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Where(token => token.Length >= 3)
            .ToList();
    }
}