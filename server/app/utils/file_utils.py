import os
import uuid

ALLOWED_EXTENSIONS = [".xls", ".xlsx"]


def validate_file_extension(filename):

    if not filename:
        return False

    file_extension = os.path.splitext(filename)[1].lower()

    return file_extension in ALLOWED_EXTENSIONS


def generate_unique_filename(filename):

    unique_filename = f"{uuid.uuid4()}_{filename}"

    return unique_filename