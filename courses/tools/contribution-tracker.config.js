(function () {
  "use strict";

  const rubric = [
    { id: "prepared", label: "Came prepared", tone: "strength" },
    { id: "unprepared", label: "Came unprepared", tone: "concern" },
    { id: "problem-solving", label: "Strong problem solving", tone: "strength" },
    { id: "decision-analysis", label: "Quality decision analysis", tone: "strength" },
    { id: "listening", label: "Good listening", tone: "strength" },
    { id: "perspectives", label: "Considered other perspectives", tone: "strength" },
    { id: "theory", label: "Connected with theory", tone: "strength" },
    { id: "connections", label: "Insightful connections", tone: "strength" },
    { id: "communication", label: "Clear communication", tone: "strength" },
    { id: "distracted", label: "Distracted", tone: "concern" },
    { id: "late", label: "Arrived late", tone: "concern" },
    { id: "absent", label: "Absent", tone: "concern" }
  ];

  const courses = {
    "4654": {
      code: "4654",
      label: "4654",
      students: [
        'Aaron Katz', 'Aasim Siddiqui', 'Alex Baldwin', 'Alex Sangara', 
        'Alexander Mccurley', 'Anika Skrzypek', 'Arjun Singh', 'Ben Symons', 
        'Billy Qian', 'Bobby Dowhan', 'Cali Martin', 'Carson Berall', 
        'Claire Kuo', 'Cristian Casiero', 'Curtis Li', 'Daniel Yuan', 
        'Denis Granulo', 'Dorie Dwosh', 'Duaa Ali', 'Elaine Chen', 'Emily Cao', 
        'Esther Fu', 'Ethan Won', 'Gabriel Iannetti', 'Himanshu Jethani', 
        'Isabella Pan', 'Ishaan Sharma', 'Jerry Wu', 'Jessica Chen', 
        'Julia Colangelo', 'Julia Gotovsky', 'Kaitlyn Oliver', 'Katy Wong', 
        'Kelly Lee', 'Kiarash Lotfalizadeh', 'Lea Jantosovicova', 'Leah DeFrancesco', 
        'Leon Mu', 'Lily Gulerce', 'Lindsay Lam', 'Luca Roma', 'Melissa Huang', 
        'Meryl Tu', 'Michela Ye', 'Molly Jin', 'Nate Samuel', 'Neik Patel', 
        'Nick Yan', 'Nora Welsby', 'Olivia Capirchio', 'Paige Radin', 
        'Rui Xi Qiu', 'Sam Sayari', 'Sanjana Khanna', 'Sebastian Opoka', 
        'Sherry Lu', 'Shiven Sharma', 'Sierra Knapton', 'Silvia Xie', 
        'Sofia Tischler', 'Sophia Emer', 'Spencer Colebeck', 'Stephanie Li', 
        'Sukhman Sunner', 'Sylvia Liu', 'Trevor Messenger', 'Will Houslander', 
        'Yingying Ping'
      ]
    },
    "4654-1": {
      code: "4654",
      section: "1",
      label: "4654 · Section 1",
      students: [
        "Abhi Ravipati", "Aidan Zia", "Amelie Pirotte", "Andrew Feng",
        "Andrew Korne", "Andrew Yang", "Armaan Sandhu", "Asher Teperson",
        "Aya Aherdan", "Ben Goring", "Caitlin Trinh", "Carrie Malkin",
        "Cheuk Yee Chen", "Clemence Valet", "Cole Smith", "Elaine Lin",
        "Elliott Wardle", "Emily Tao", "Emma Jewell", "Gabriel Sinha",
        "Grace Cousineau", "Jack McDonnell", "Jackie Yuan", "Jessica Luo",
        "Johann Abraham", "Junsoo Pak", "Kyle Kim", "Laura Amelie Cordeddu",
        "Liam Geddes", "Madie Erauw", "Mallery Fischer", "Mathis Zanzucchi",
        "Michael Wei", "Miriam Youssef", "MK Dao", "Nathan Mark", "Newt Chen",
        "Nienke Toonen", "Oren Joffe", "Otis Ding", "Peter Guo", "Peyton Kou",
        "Ricky Chiu", "Rongrui Mao", "Ryan Mitchener", "Sadiyah Sajjad",
        "Sarah Smith", "Tessa Fois", "Uttej Mannava"
      ]
    },
    "4654-2": {
      code: "4654",
      section: "2",
      label: "4654 · Section 2",
      students: [
        "Adam Ramkissoon", "Andrew Ko", "Andy Hwang", "Annika Cann", "Belle Li",
        "Braeden Stewart", "Carol Xu", "Cole Purdell-Lewis", "Connie Xu",
        "Emma Bradacs", "Ethan Gilhula", "Evan Scrivener", "Fiona Fan",
        "Florence Rouvez", "Francesco Rende", "Gabe Evans", "Hanisha Dhoofar",
        "Hannah Jeon", "Hooman Mohammadi", "Isabella Valdez", "Jack Hogan",
        "Jackson Su", "Jasmine Gu", "Joanne Shao", "Joseph Spadafina",
        "Keegan Smith", "Kieran Amoroso", "Maurice Ma", "Michael Thien",
        "Nicholas Giangregorio", "Oliver He", "Ryan Pin Harry", "Sabrina So",
        "Sanaa El Fatihi", "Sarah Shao", "Sarinah Goolam", "Simon Hungate",
        "Steven Grano", "Sudipta Sarkar", "Travis MacKay", "Xin Zeng",
        "Yusuf Nissar", "Yvonne Xi", "Zi Li"
      ]
    },
    "9483": {
      code: "9483",
      label: "9483",
      students: [
        'Gaurav Agarwal', 'Devapriya Anitha Sreekumar', 'Bella Anwan', 'Nora Arman',
        'Ev Cook', 'Jehan Dhalwani', 'Kriti Gupta', 'Sahana Kapur',
        'Mehika Kumbhkarni', 'Damon Le', 'Zichen Liu', 'Simon Okafor',
        'Aabiyeh Parveen', 'Tillie Pham', 'Daniel Priezjev', 'Callum Russell',
        'Udayan Sahai', 'Laila Saili', 'Emilie Smit-de Bree', 'Matthew Tewkesbury',
        'Damien Wu',
      ]
    }
  };

  window.CONTRIBUTION_TRACKER_CONFIG = { rubric, courses };
})();
