'''
This file contains the styles for the pink themed website.
'''
import tkinter as tk
from tkinter import ttk
def configure_styles():
    # Configure the style for the portfolio button
    portfolio_style = ttk.Style()
    portfolio_style.configure("Portfolio.TButton", font=("Arial", 12, "bold"), foreground="white", background="pink")
configure_styles()