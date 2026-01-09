import os
import shutil

def organize_file(file_path, category, base_dir):
    target_dir = os.path.join(base_dir, category)
    os.makedirs(target_dir, exist_ok=True)

    shutil.move(file_path, os.path.join(target_dir, os.path.basename(file_path)))
