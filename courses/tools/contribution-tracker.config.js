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
        "Amandine Prioux", "Anthony Pham", "Audrey Ghilain", "Brandon Jones",
        "Chloe Bissell", "David Hascal", "David Kang", "Declan O'Neill",
        "Emily Kim", "Emily Qin", "Gauri Pasbola", "Gavin Barclay",
        "Hailey Tang", "Isabel Yuan", "Jamie White", "Jane Wang",
        "Jennifer Bitton", "Joey Lisser", "Joyce Liu", "Junaid Rana",
        "Kate McCallum", "Katie Werner", "Kayla DeAngelis", "Kayla Whitnell",
        "Lauren Um", "Lena Tang Qiu", "Makenzie Shirley", "Mara Lerf",
        "Max Leibovich", "Noah Roddis", "Nunu Mequanint", "Orianna Lui",
        "Palina Radzioshkina", "Patrick Westdal", "Ryan Smith", "Sam Lu",
        "Saniya Niyoosha", "Shane Gitlin", "Siqi Man", "Sue Han",
        "Tanner Spadafora", "Tej Sharma", "Theo Kalff", "Timothy Haluk",
        "Tristan Gilchrist", "Wenqi Shen", "Yiling Yang"
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
        "Aaditya Geed", "Aanal Patel", "Adam Meadows", "Akber Amanulla Khan",
        "Alan Hwang", "Alice Wu", "Aliya Nazeer", "Angelita Martin",
        "Bella Natasha Diego", "Calvin Zehr", "Chaitanya Gandhi", "Cherry Qian",
        "Derek Adam", "DHDan Hicks", "Elisabeth Iannucci", "Iain Smith",
        "Ishani Adityan", "Ishi Khamesra", "Jennifer Estrada", "Josh Ge",
        "Judith Osemeke", "Kayla Vargas", "Kendall Zhang", "Kiera Treloar",
        "Mac Astritis", "Maro Egbedi", "May El Damatty", "Michael Schumacher",
        "Olamide Adeboboye", "Princess Adeniran", "Quoc Lap Nguyen",
        "Ramnik Minhas", "Rio Baudisch-McCabe", "Robert Gray", "Sam Macy",
        "Sangeetha Sambamoorthy", "Sean Morris", "Sifan Wang",
        "Silvia Pacheco Diaz", "Valentina Efionayi"
      ]
    }
  };

  window.CONTRIBUTION_TRACKER_CONFIG = { rubric, courses };
})();
