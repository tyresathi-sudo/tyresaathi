import os
from PIL import Image, ImageDraw

def generate_icons():
    src_logo_path = r"d:\Antigravity\Tyresathi\public\logo.png"
    if not os.path.exists(src_logo_path):
        print("Source logo not found:", src_logo_path)
        return

    src_img = Image.open(src_logo_path).convert("RGBA")
    
    # Base res directory
    res_dir = r"d:\Antigravity\Tyresathi\android\app\src\main\res"

    # Mipmap densities and their dimensions
    mipmaps = {
        "mipmap-mdpi": {"launcher": 48, "foreground": 108},
        "mipmap-hdpi": {"launcher": 72, "foreground": 162},
        "mipmap-xhdpi": {"launcher": 96, "foreground": 216},
        "mipmap-xxhdpi": {"launcher": 144, "foreground": 324},
        "mipmap-xxxhdpi": {"launcher": 192, "foreground": 432},
    }

    # Generate Mipmap Icons
    for folder, sizes in mipmaps.items():
        folder_path = os.path.join(res_dir, folder)
        os.makedirs(folder_path, exist_ok=True)
        
        # 1. ic_launcher.png (Square / standard icon with white background)
        l_size = sizes["launcher"]
        launcher_img = Image.new("RGBA", (l_size, l_size), (255, 255, 255, 255))
        # resize src_img with slight padding
        pad = int(l_size * 0.08)
        content_size = l_size - (pad * 2)
        scaled = src_img.resize((content_size, content_size), Image.Resampling.LANCZOS)
        launcher_img.paste(scaled, (pad, pad), scaled)
        launcher_img.save(os.path.join(folder_path, "ic_launcher.png"), "PNG")

        # 2. ic_launcher_round.png (Circular masked icon)
        round_img = Image.new("RGBA", (l_size, l_size), (0, 0, 0, 0))
        # create circular mask
        mask = Image.new("L", (l_size, l_size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, l_size - 1, l_size - 1), fill=255)
        # paste white background + logo
        bg_circle = Image.new("RGBA", (l_size, l_size), (255, 255, 255, 255))
        bg_circle.paste(scaled, (pad, pad), scaled)
        round_img.paste(bg_circle, (0, 0), mask)
        round_img.save(os.path.join(folder_path, "ic_launcher_round.png"), "PNG")

        # 3. ic_launcher_foreground.png (Adaptive icon foreground - centered in safe zone ~65%)
        fg_size = sizes["foreground"]
        fg_img = Image.new("RGBA", (fg_size, fg_size), (0, 0, 0, 0))
        inner_size = int(fg_size * 0.65)
        fg_scaled = src_img.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
        offset = (fg_size - inner_size) // 2
        fg_img.paste(fg_scaled, (offset, offset), fg_scaled)
        fg_img.save(os.path.join(folder_path, "ic_launcher_foreground.png"), "PNG")

    # Generate Splash Screens
    splashes = {
        "drawable": (480, 800),
        "drawable-port-mdpi": (320, 480),
        "drawable-port-hdpi": (480, 800),
        "drawable-port-xhdpi": (720, 1280),
        "drawable-port-xxhdpi": (960, 1600),
        "drawable-port-xxxhdpi": (1280, 1920),
        "drawable-land-mdpi": (480, 320),
        "drawable-land-hdpi": (800, 480),
        "drawable-land-xhdpi": (1280, 720),
        "drawable-land-xxhdpi": (1600, 960),
        "drawable-land-xxxhdpi": (1920, 1280),
    }

    for folder, (w, h) in splashes.items():
        folder_path = os.path.join(res_dir, folder)
        os.makedirs(folder_path, exist_ok=True)
        splash_bg = Image.new("RGBA", (w, h), (255, 255, 255, 255))
        # Logo size roughly 40-50% of min dimension
        logo_dim = int(min(w, h) * 0.55)
        scaled_logo = src_img.resize((logo_dim, logo_dim), Image.Resampling.LANCZOS)
        pos = ((w - logo_dim) // 2, (h - logo_dim) // 2)
        splash_bg.paste(scaled_logo, pos, scaled_logo)
        splash_bg.save(os.path.join(folder_path, "splash.png"), "PNG")

    # Also generate Web PWA icons
    public_dir = r"d:\Antigravity\Tyresathi\public"
    pwa_192 = src_img.resize((192, 192), Image.Resampling.LANCZOS)
    pwa_192.save(os.path.join(public_dir, "icon-192.png"), "PNG")
    pwa_512 = src_img.resize((512, 512), Image.Resampling.LANCZOS)
    pwa_512.save(os.path.join(public_dir, "icon-512.png"), "PNG")
    
    # Favicon 32x32
    fav = src_img.resize((32, 32), Image.Resampling.LANCZOS)
    fav.save(os.path.join(public_dir, "favicon.png"), "PNG")

    print("All icons and splash screens successfully generated!")

if __name__ == "__main__":
    generate_icons()
