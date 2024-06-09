
import random

# Класс игрушки
class Toy:
    def __init__(self, toy_id, name, quantity, frequency):
        self.toy_id = toy_id
        self.name = name
        self.quantity = quantity
        self.frequency = frequency

    def update_frequency(self, frequency):
        self.frequency = frequency

# Класс магазина
class ToyStore:
    def __init__(self):
        self.toys = []

    def add_toy(self, toy):
        self.toys.append(toy)

    def get_prize_toy(self):
        prize_toy = random.choices(self.toys, [toy.frequency for toy in self.toys])[0]

        #  уменьшение и обновление игрушек
        prize_toy.quantity -= 1
        prize_toy.update_frequency(prize_toy.quantity)

        # записываем выбранную игрушку в файл
        with open("prize_toys.txt", "a") as file:
            file.write(f"Prize Toy: {prize_toy.name}\n")

        return prize_toy

# Создаем экземпляр магазина
toy_store = ToyStore()

# добавляем игрушки в магазин
toy1 = Toy(1, "Doll", 10, 10)
toy2 = Toy(2, "Car", 5, 5)
toy3 = Toy(3, "Teddy Bear", 8, 8)

toy_store.add_toy(toy1)
toy_store.add_toy(toy2)
toy_store.add_toy(toy3)

# Розыгрыш 5 игрушек
for _ in range(5):
    prize_toy = toy_store.get_prize_toy()
    print(f"Prize Toy: {prize_toy.name}")

# Проверка оставшихся игрушек
for toy in toy_store.toys:
    print(f"Remaining {toy.name}: {toy.quantity}")


