import pygame
import random
import math
import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")

# Select the database
db = client["game_database"]

# Select the collection
collection = db["highscores"]

# Query the database to get the top 10 high scores
top_scores = collection.find().sort("score", pymongo.DESCENDING).limit(10)


def spawn_box(screen, color, position, size):
    """Draw a box on the given screen at the given position with the given size and color."""
    pygame.draw.rect(screen, color, (*position, *size))
    return pygame.Rect(*position, *size)

def random_box_position(size, existing_rects):
    """Generate a random position for a box, ensuring it doesn't overlap with existing rects."""
    while True:
        position = (random.randint(0, screen_width - size[0]), random.randint(0, screen_height - size[1]))
        new_rect = pygame.Rect(*position, *size)
        if not any(new_rect.colliderect(rect) for rect in existing_rects):
            return position

def calculate_bullet_direction(start_pos, target_pos):
    """Calculate the normalized direction vector from start_pos to target_pos."""
    dx = target_pos[0] - start_pos[0]
    dy = target_pos[1] - start_pos[1]
    distance = math.sqrt(dx**2 + dy**2)
    return dx / distance, dy / distance

def spawn_zombie(existing_rects, edge_margin=40):
    """Spawn a zombie at a random location near the edges of the screen, not colliding with existing rects."""
    size = (40, 60)  # Size of the zombie

    # Define possible positions near the edges
    possible_positions = [
        (random.randint(0, screen_width - size[0]), random.choice([0, screen_height - size[1]])),  # Top or bottom edge
        (random.choice([0, screen_width - size[0]]), random.randint(0, screen_height - size[1]))   # Left or right edge
    ]

    # Try positions until finding one that doesn't collide with existing rects
    while True:
        position = random.choice(possible_positions)
        new_rect = pygame.Rect(*position, *size)
        if not any(new_rect.colliderect(rect) for rect in existing_rects):
            return new_rect, (0, 100, 0)  # Dark green color


def move_zombie(zombie_rect, player_rect, velocity, boxes):
    """Move the zombie towards the player, halving the speed if colliding with a box."""
    original_velocity = velocity
    # Check if the zombie collides with any box and halve the speed if so
    if any(zombie_rect.colliderect(box) for box in boxes):
        velocity //= 2  # Reduce velocity by half

    zombie_x, zombie_y = zombie_rect.x, zombie_rect.y
    player_x, player_y = player_rect.x, player_rect.y

    if zombie_x < player_x:
        zombie_x += min(velocity, player_x - zombie_x)
    elif zombie_x > player_x:
        zombie_x -= min(velocity, zombie_x - player_x)

    if zombie_y < player_y:
        zombie_y += min(velocity, player_y - zombie_y)
    elif zombie_y > player_y:
        zombie_y -= min(velocity, zombie_y - player_y)

    # Reset velocity for the next move
    velocity = original_velocity

    return pygame.Rect(zombie_x, zombie_y, zombie_rect.width, zombie_rect.height)

def draw_button(screen, text, position, size, action=None):
    mouse = pygame.mouse.get_pos()
    click = pygame.mouse.get_pressed()

    button_rect = pygame.Rect(position[0], position[1], size[0], size[1])
    if button_rect.collidepoint(mouse):
        pygame.draw.rect(screen, (200, 200, 200), button_rect)  # Highlight color
        if click[0] == 1 and action is not None:
            pygame.time.wait(300)  # Wait a short period to avoid accidental double-clicks
            action()  # Call the action associated with the button
    else:
        pygame.draw.rect(screen, (100, 100, 100), button_rect)  # Default color

    font = pygame.font.SysFont(None, 40)
    text_surf = font.render(text, True, (255, 255, 255))
    text_rect = text_surf.get_rect(center=button_rect.center)
    screen.blit(text_surf, text_rect)

is_main_menu_active = True

def start_game():
    global is_main_menu_active
    is_main_menu_active = False  # This will exit the main menu

def show_controls(screen):
    controls_running = True
    while controls_running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Left mouse click
                    # Check if the 'Back' button is clicked
                    back_button_rect = pygame.Rect(100, 400, 150, 50)
                    if back_button_rect.collidepoint(pygame.mouse.get_pos()):
                        controls_running = False  # Go back to main menu

        screen.fill((0, 0, 0))  # Clear screen

        # Draw the text for controls
        font = pygame.font.SysFont(None, 40)
        movement_text = font.render("Movement: Arrow keys", True, (255, 255, 255))
        shoot_text = font.render("Shoot: Mouse", True, (255, 255, 255))
        screen.blit(movement_text, (100, 100))
        screen.blit(shoot_text, (100, 150))

        # Draw the 'Back' button
        draw_button(screen, "Back", (100, 400), (150, 50))

        pygame.display.update()
        clock.tick(60)

def show_high_scores():
    highscores_running = True

    while highscores_running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Left mouse click
                    # Check if the 'Back' button is clicked
                    back_button_rect = pygame.Rect(100, 400, 150, 50)
                    if back_button_rect.collidepoint(pygame.mouse.get_pos()):
                        highscores_running = False  # Go back to main menu

        # Query the top 10 high scores from MongoDB
        top_scores = collection.find().sort("score", pymongo.DESCENDING).limit(10)

        screen.fill((0, 0, 0))  # Clear screen

        # Draw the 'Back' button
        draw_button(screen, "Back", (100, 400), (150, 50))
        draw_button(screen, "Reset Scores", (100, 500), (150, 50), reset_high_scores)

        # Display the top 10 high scores
        font = pygame.font.Font(None, 36)
        y = 100  # Starting vertical position for scores
        for rank, score_entry in enumerate(top_scores, start=1):
            score = score_entry["score"]
            score_text = font.render(f"#{rank}: {score}", True, (255, 255, 255))
            score_rect = score_text.get_rect(center=(screen_width // 2, y))
            screen.blit(score_text, score_rect)
            y += 40  # Increase vertical position for the next score

        pygame.display.update()
        clock.tick(60)


def game_over_screen(screen, score):
    main_menu_button_rect = pygame.Rect(screen_width // 2 - 75, screen_height // 2 + 50, 150, 50)
    
    game_over_running = True
    while game_over_running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if main_menu_button_rect.collidepoint(pygame.mouse.get_pos()):
                    game_over_running = False  # Exit the game over screen loop
                    
        screen.fill((0, 0, 0))  # Clear screen

        # Draw "Game Over" message
        game_over_font = pygame.font.SysFont('arial', 64)
        game_over_text = game_over_font.render('Game Over', True, (255, 0, 0))
        game_over_rect = game_over_text.get_rect(center=(screen_width // 2, screen_height // 2 - 50))
        screen.blit(game_over_text, game_over_rect)

        # Draw score message
        score_font = pygame.font.SysFont('arial', 32)
        score_text = score_font.render(f'Your score: {score}', True, (255, 255, 255))
        score_rect = score_text.get_rect(center=(screen_width // 2, screen_height // 2))
        screen.blit(score_text, score_rect)

        # Draw "Main Menu" button
        draw_button(screen, "Main Menu", main_menu_button_rect.topleft, main_menu_button_rect.size)

        pygame.display.update()
        clock.tick(60)
        
    main_menu(screen)


def main_menu(screen):
    global is_main_menu_active
    is_main_menu_active = True  # Start with the main menu active
    
    while is_main_menu_active:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Left mouse click
                    # Assuming draw_button returns True if the button is clicked
                    if draw_button(screen, "Start Game", (100, 100), (150, 50), start_game):
                        is_main_menu_active = False
                    # Draw the 'Controls' button and check if it's clicked
                    if draw_button(screen, "Controls", (100, 200), (150, 50), lambda: show_controls(screen)):
                        show_controls(screen)  # Call the show_controls function


        screen.fill((0, 0, 0))  # Clear screen

        # Draw buttons
        draw_button(screen, "Start Game", (100, 100), (150, 50), start_game)
        draw_button(screen, "Controls", (100, 200), (150, 50), show_controls)
        draw_button(screen, "High-Scores", (100, 300), (150, 50), show_high_scores)

        pygame.display.update()
        clock.tick(60)

def reset_high_scores():
    try:
        # Delete all documents (scores) from the "highscores" collection
        collection.delete_many({})
        print("All high scores have been reset.")
    except Exception as e:
        print(f"An error occurred: {e}")


def reset_game(screen):
    global player_alive, game_over, zombie_kill_count, zombies, bullets, is_main_menu_active
    player_alive = True
    game_over = False
    zombie_kill_count = 0
    zombies = []
    bullets = []
    is_main_menu_active = True  # Make sure to set this to True to show the main menu again


# Initialize Pygame and random module
pygame.init()
random.seed()

# Set up a clock for timing
clock = pygame.time.Clock()

# Set the dimensions of the window and colors
screen_width, screen_height = 1280, 720
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Pyrasho")
red = (255, 0, 0)
brown = (139, 69, 19)

# Player properties
x, y = 50, 50
player_width, player_height = 40, 60
player_velocity = 9

player_alive = True
game_over = False

# Bullet properties
bullet_size = (4, 4)
bullet_color = (255, 255, 0)  # Yellow color
bullet_velocity = 15
bullets = []  # List to keep track of bullets

# Zombie properties
zombie_velocity = 9  # Velocity of the zombies

zombie_wave_size = 1  # Initial number of zombies in a wave
time_since_last_increase = 0  # Time since the last increase in zombie wave size
wave_increase_interval = 6000  # Time interval (in milliseconds) to increase wave size

zombie_kill_count = 0  # Initialize the zombie kill counter


# Middle box properties
middle_box_size = (125, 125)
middle_box_position = ((screen_width - middle_box_size[0]) // 2, (screen_height - middle_box_size[1]) // 2)
middle_box_rect = pygame.Rect(*middle_box_position, *middle_box_size)

# Generate three additional random boxes
random_boxes = [middle_box_rect]
for _ in range(3):
    size = (random.randint(75, 125), random.randint(75, 125))
    position = random_box_position(size, random_boxes)
    random_boxes.append(pygame.Rect(*position, *size))

# Spawn a zombie
zombie_rect, zombie_color = spawn_zombie(random_boxes + [pygame.Rect(x, y, player_width, player_height)])
zombie_active = True  # Flag to indicate whether the zombie is active

# Time tracking for zombie respawn
zombie_respawn_time = 2000  # 2 seconds in milliseconds
last_zombie_deactivation_time = 0

zombies = []

main_menu(screen)

# Game loop
running = True
while running:
    if game_over:
        # Handle events when the game is over
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                # Assuming the 'main_menu_button_rect' is defined in 'game_over_screen'
                if main_menu_button_rect.collidepoint(pygame.mouse.get_pos()):
                    game_over = False  # Reset the game over flag
                    reset_game(screen)  # Reset the game state
                    main_menu(screen)  # Return to the main menu
        # Draw the game over screen
        screen.fill((0, 0, 0))  # Clear screen
        game_over_font = pygame.font.SysFont('arial', 64)
        game_over_text = game_over_font.render('Game Over', True, (255, 0, 0))
        game_over_rect = game_over_text.get_rect(center=(screen_width // 2, screen_height // 2))
        screen.blit(game_over_text, game_over_rect)
        # Draw "Main Menu" button
        main_menu_button_rect = pygame.Rect(screen_width // 2 - 75, screen_height // 2 + 50, 150, 50)
        draw_button(screen, "Main Menu", main_menu_button_rect.topleft, main_menu_button_rect.size)
        pygame.display.update()
        continue  # Skip the rest of the game loop

    pygame.time.delay(50)
    dt = clock.tick(60)  # Time passed since last tick in milliseconds
    time_since_last_increase += dt

    # Increase zombie wave size every 15 seconds
    if time_since_last_increase >= wave_increase_interval:
        zombie_wave_size += 1
        time_since_last_increase = 0

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 1:  # Left mouse click
                # Calculate bullet direction and create bullet
                bullet_direction = calculate_bullet_direction((x + player_width // 2, y + player_height // 2), pygame.mouse.get_pos())
                bullets.append({
                    "rect": pygame.Rect(x + player_width // 2, y + player_height // 2, *bullet_size),
                    "direction": bullet_direction
                })
        # Inside your main game loop event handling
        if game_over:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                    if main_menu_button_rect.collidepoint(pygame.mouse.get_pos()):
                        reset_game(screen)


    # Player movement handling
    keys = pygame.key.get_pressed()
    new_x, new_y = x, y  # Initialize new coordinates with current position

    if keys[pygame.K_LEFT] and x > 0:
        new_x -= player_velocity
    if keys[pygame.K_RIGHT] and x < screen_width - player_width:
        new_x += player_velocity
    if keys[pygame.K_UP] and y > 0:
        new_y -= player_velocity
    if keys[pygame.K_DOWN] and y < screen_height - player_height:
        new_y += player_velocity

    # Update player position
    player_rect = pygame.Rect(new_x, new_y, player_width, player_height)
    if not player_rect.colliderect(middle_box_rect) and all(not player_rect.colliderect(box) for box in random_boxes):
        x, y = new_x, new_y

    # Check if it's time to respawn zombies
    if not any(zombie["active"] for zombie in zombies) and (pygame.time.get_ticks() - last_zombie_deactivation_time > zombie_respawn_time):
        for _ in range(zombie_wave_size):
            new_zombie_rect, new_zombie_color = spawn_zombie(random_boxes + [player_rect])
            zombies.append({"rect": new_zombie_rect, "color": new_zombie_color, "active": True})

    # Update zombie positions if active
    for zombie in zombies:
        if zombie["active"]:
            zombie["rect"] = move_zombie(zombie["rect"], player_rect, zombie_velocity, random_boxes)

    # Inside your game loop where you check for player-zombie collisions
    for zombie in zombies:
        if zombie["active"] and player_rect.colliderect(zombie["rect"]):
            collection.insert_one({"score": zombie_kill_count})
            game_over_screen(screen, zombie_kill_count)  # Call the game over screen
            reset_game(screen)  # Reset the game after returning from the game over screen
            break



    # Update bullet positions
    bullets_to_remove = []
    for bullet in bullets:
        bullet["rect"].x += bullet["direction"][0] * bullet_velocity
        bullet["rect"].y += bullet["direction"][1] * bullet_velocity

        # Check for collision with any zombie
        bullet_hit_zombie = False
        for zombie in zombies:
            if zombie["active"] and bullet["rect"].colliderect(zombie["rect"]):
                bullet_hit_zombie = True
                zombie["active"] = False
                last_zombie_deactivation_time = pygame.time.get_ticks()
                zombie_kill_count += 1  # Increment the kill counter
                break  # Bullet hit a zombie

        # Mark bullet for removal if it hit a zombie or went off-screen
        if bullet_hit_zombie or bullet["rect"].x < 0 or bullet["rect"].x > screen_width or bullet["rect"].y < 0 or bullet["rect"].y > screen_height:
            bullets_to_remove.append(bullet)

    # Remove marked bullets from the list
    for bullet in bullets_to_remove:
        if bullet in bullets:
            bullets.remove(bullet)

    # Clear screen
    screen.fill((0, 0, 0))

    # Kill counter
    font = pygame.font.SysFont(None, 40)
    kill_count_text = font.render(f"Kills: {zombie_kill_count}", True, (255, 255, 255))
    kill_count_rect = kill_count_text.get_rect(topright=(screen_width - 20, 20))  # Position it 20 pixels from the top right corner
    screen.blit(kill_count_text, kill_count_rect)


    # Draw player
    spawn_box(screen, red, (x, y), (player_width, player_height))

    # Draw middle box and additional boxes
    spawn_box(screen, brown, middle_box_position, middle_box_size)
    for box in random_boxes:
        spawn_box(screen, brown, box.topleft, box.size)

    # Draw zombies
    for zombie in zombies:
        if zombie["active"]:
            spawn_box(screen, zombie["color"], zombie["rect"].topleft, zombie["rect"].size)


    # Draw bullets
    for bullet in bullets:
        pygame.draw.rect(screen, bullet_color, bullet["rect"])

    # Inside your main game loop, after updating all game entities
    if game_over:
        # Draw "Game Over" message
        game_over_font = pygame.font.SysFont('arial', 64)
        game_over_text = game_over_font.render('Game Over', True, (255, 0, 0))
        game_over_rect = game_over_text.get_rect(center=(screen_width // 2, screen_height // 2))
        screen.blit(game_over_text, game_over_rect)

        # Draw "Main Menu" button
        main_menu_button_rect = pygame.Rect(screen_width // 2 - 75, screen_height // 2 + 50, 150, 50)
        draw_button(screen, "Main Menu", main_menu_button_rect.topleft, main_menu_button_rect.size, action=lambda: reset_game(screen))

        # Stop further drawing or updating of game entities since it's game over
        pygame.display.update()
        continue


    # Update display
    pygame.display.update()

# Quit Pygame
pygame.quit()