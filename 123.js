import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

 class Toy {
    private int id;
    private String name;
    private int quantity;
    private int frequency;

    public Toy(int id, String name, int quantity, int frequency) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.frequency = frequency;
    }

    public void addToy(Map<Integer, Toy> toys) {
        toys.put(this.id, this);
    }

    public void changeFrequency(Map<Integer, Toy> toys, int newFrequency) {
        toys.get(this.id).frequency = newFrequency;
    }

    public static Toy selectToy(Map<Integer, Toy> toys) {
        int totalFrequency = toys.values().stream().mapToInt(Toy::getFrequency).sum();
        Random random = new Random();
        int randomNumber = random.nextInt(totalFrequency);
        int accumulatedFrequency = 0;
        for (Toy toy : toys.values()) {
            accumulatedFrequency += toy.getFrequency();
            if (randomNumber < accumulatedFrequency) {
                toy.quantity--;
                toys.remove(toy.getId());
                return toy;
            }
        }
        return null;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getFrequency() {
        return frequency;
    }

    @Override
    public String toString() {
        return "Toy{id=" + id + ", name='" + name + "', quantity=" + quantity + ", frequency=" + frequency + "}";
    }
}

 class Main {
    public static void main(String[] args) {
        Map<Integer, Toy> toys = new HashMap<>();
        Toy toy1 = new Toy(1, "Car", 10, 20);
        Toy toy2 = new Toy(2, "Doll", 15, 30);

        toy1.addToy(toys);
        toy2.addToy(toys);

        toy1.changeFrequency(toys, 25);

        Toy selectedToy = Toy.selectToy(toys);
        System.out.println("Selected Toy: " + selectedToy);

        // Сохранение призовой игрушки в текстовый файл
        try (FileWriter fileWriter = new FileWriter("selected_toy.txt")) {
            fileWriter.write(selectedToy.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}