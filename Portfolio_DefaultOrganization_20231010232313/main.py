'''
This is the main file that runs the pink themed website for Michelle Lawson.
'''
import tkinter as tk
from tkinter import ttk
class PinkWebsiteApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Michelle Lawson's Portfolio")
        self.root.geometry("800x600")
        self.root.configure(bg="pink")
        self.create_widgets()
    def create_widgets(self):
        # Create a label for displaying Michelle Lawson's information
        info_label = ttk.Label(self.root, text="MICHELLE LAWSON", font=("Arial", 16, "bold"), background="pink")
        info_label.pack(pady=20)
        # Create a frame for displaying the person's info and portfolio
        frame = ttk.Frame(self.root, background="white", relief="solid", borderwidth=1)
        frame.pack(pady=20, padx=50)
        # Create labels to display the person's info
        info_text = "Smith College - Northampton MA, USA, Graduating May 2026\n\nMajor: Computer Science, GPA 3.84\n\nRelevant Coursework: Algorithms, Data Structures, Object Oriented Programming, Theory of Computation, Financial Statement Modeling\n\nTechnical Skills: Python, Java, R, Excel, Quantitative Analysis, Statistical Programming\n\nSoft Skills: Analytical Thinking, Communication, Leadership, Planning"
        info_label = ttk.Label(frame, text=info_text, font=("Arial", 12), background="white", wraplength=600, justify="left")
        info_label.pack(pady=10)
        # Create a button for the person's portfolio
        portfolio_button = ttk.Button(frame, text="View Portfolio", command=self.open_portfolio, style="Portfolio.TButton")
        portfolio_button.pack(pady=10)
    def open_portfolio(self):
        # Open the person's portfolio in a new window
        portfolio_window = tk.Toplevel(self.root)
        portfolio_window.title("Portfolio")
        portfolio_window.geometry("800x600")
        portfolio_window.configure(bg="pink")
        # Create a label for the portfolio
        portfolio_label = ttk.Label(portfolio_window, text="Portfolio", font=("Arial", 16, "bold"), background="pink")
        portfolio_label.pack(pady=20)
        # Create a frame for displaying the portfolio content
        portfolio_frame = ttk.Frame(portfolio_window, background="white", relief="solid", borderwidth=1)
        portfolio_frame.pack(pady=20, padx=50)
        # Create labels to display the portfolio content
        portfolio_text = "Computer Science Research - Northampton, MA, May 2023 - August 2023\nUndergraduate Research Fellow. Spearheaded statistical analysis, management, curation, and interpretation of large datasets on 200 students’ performance and backgrounds to drive research direction. Utilized R and Python to analyze and visualize data, contributing significantly to the understanding and presentation of research statistics. Presented data-driven recommendations to the research team to optimize educational strategies in computer science, demonstrating the application of quantitative analysis in decision-making.\n\nSmith College - Northampton, MA, Oct 2022 - Present\nStudent Affairs Intern. Facilitated communication between 2,900 students, families, and staff. Managed the planning and execution of 2 student orientation events with 700 attendees.\n\nSchoolhouse.world - Remote, July 2021 - Oct 2021\nVolunteer Tutor & Community Engagement Team Member. Tutored 74 learners from 21 countries in Computer Science, Mathematics & Spanish. Adapted to 41 student needs by planning and executing individualized tutoring sessions tailored to specific student needs and feedback.\n\nEducating Computer Science Girlies\nSuccessfully built and led a thriving online community, Computer Science Girlies, with over 50,000 TikTok followers and 2,000 members on Discord. Leveraged effective communication and leadership skills to educate and connect women in computer science, fostering an inclusive and supportive environment within the community. Demonstrated technical expertise by creating engaging content on TikTok to promote computer science education, resulting in a substantial increase in followers and active engagement.\n\nDelta Airlines Financial Analysis\nConducted and presented a data-driven investment pitch in a team of 5 on Delta Airlines' financial performance, utilizing financial statement analysis, industry trend evaluation, and growth forecasting. Worked with a team of analysts to evaluate potential investment risks through quantitative methods.\n\nResearch on Cryptographic Algorithms\nPerformed an analysis of the speed and security features of both SHA-256 and SHA-3 cryptographic algorithms, after implementing both algorithms in a testing environment to measure performance. Produced a 27 page paper highlighting key takeaways from in-depth statistical and historical analysis.\n\nLeadership Roles\nInternational Students Organization, First Year Rep & IS Program Leader, Smith College, 2022/2023\nGoogle Developers Student Club, Coordination Lead, Smith College, 2022/2023\nSmithies in Computer Science, Vice President, Smith College, 2022/2023"
        portfolio_label = ttk.Label(portfolio_frame, text=portfolio_text, font=("Arial", 12), background="white", wraplength=600, justify="left")
        portfolio_label.pack(pady=10)
def run_app():
    configure_styles()
    root = tk.Tk()
    app = PinkWebsiteApp(root)
    root.mainloop()
if __name__ == "__main__":
    run_app()