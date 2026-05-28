import os
import uuid

ALLOWED_EXTENSIONS = [".xls", ".xlsx"]


def validate_file_extension(filename):

    file_extension = os.path.splitext(filename)[1].lower()

    if file_extension not in ALLOWED_EXTENSIONS:
        return False

    return True


def generate_unique_filename(filename):

    unique_filename = f"{uuid.uuid4()}_{filename}"

    return unique_filename