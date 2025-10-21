"""
app.endpoints package initializer
- Automatically imports all route modules in this folder
- Handles import errors gracefully
- Exposes all useful Flask utilities and modules
"""
from flask import (
    Flask,
    Blueprint,
    request,
    redirect,
    url_for,
    session,
    make_response,
    jsonify,
)
import sqlite3
from datetime import timedelta
import pkgutil
import importlib
import traceback
# --- Blueprint setup ---
endpoints = Blueprint("endpoints", __name__)

# --- Base __all__ list ---
__all__ = [
    "endpoints",
    "Flask",
    "Blueprint",
    "request",
    "redirect",
    "url_for",
    "session",
    "make_response",
    "jsonify",
    "sqlite3",
    "timedelta",
]

# --- Safe dynamic importer ---
for _, module_name, is_pkg in pkgutil.iter_modules(__path__):
    if is_pkg or module_name.startswith("__"):
        continue
    try:
        module = importlib.import_module(f"{__name__}.{module_name}")
        globals()[module_name] = module
        __all__.append(module_name)
        print(f"[INFO] Loaded endpoint module: {module_name}")
    except Exception as e:
        print(f"[ERROR] Failed to import endpoint '{module_name}': {e}")
        traceback.print_exc()

print("[INFO] All endpoints initialized successfully.")
