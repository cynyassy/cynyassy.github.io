// Content only: importing the catalogue never imports game logic or artwork.
export interface ProjectCardContent {category:string;summary:string;role:string;proof:string;action:string}
export interface ProjectContent {
 name:string;type:string;role:string;hook:string;description:string;url:string;
 card:ProjectCardContent;
 hero?:{skills:readonly string[];role:string;description:string};
 playground?:{role:string;description:string};
}
const catalogue = {
  "brew": {
    "name": "Indian Coffee Stories",
    "type": "Publication & connected product",
    "role": "Communication strategy, writing, research, design and full-stack development",
    "hook": "Stories, channels, discovery tools and a brewing app. Built together.",
    "description": "Indian Coffee Stories brings together my writing, video, communication strategy, discovery tools and Brew Tracker. The app is one part of the coffee ecosystem I am building.",
    "url": "/projects/coffee-tools.html",
    "card": {
      "category": "Publication & connected product",
      "summary": "Stories, channels, discovery tools and a brewing app. Built together.",
      "role": "Communication · Writing · Design · Development",
      "proof": "From idea to working product",
      "action": "View case study"
    },
    "hero": {
      "skills": [
        "Writing",
        "Research",
        "Design",
        "Development"
      ],
      "role": "Communication, research, design and development",
      "description": "A coffee publication, discovery tools and Brew Tracker, with the communication around them."
    },
    "playground": {
      "role": "Writing, research, product design and development",
      "description": "A publication, coffee directories and Brew Tracker, with the communication around them."
    }
  },
  "algotest": {
    "name": "AlgoTest",
    "type": "Product education & growth",
    "role": "Product education, content and growth strategy",
    "hook": "See how the documentation became a way to grow the product.",
    "description": "I helped turn a complicated trading product into something people could get started with and keep using.",
    "url": "/projects/algotest.html",
    "card": {
      "category": "Product education & growth",
      "summary": "Turning product knowledge into a growth engine.",
      "role": "Strategy · Documentation · SEO",
      "proof": "6× organic clicks",
      "action": "View case study"
    },
    "hero": {
      "skills": [
        "Writing",
        "Research"
      ],
      "role": "Documentation, product education and SEO",
      "description": "I built guides around traders’ questions to help them get started with a complex product."
    },
    "playground": {
      "role": "Documentation, product education and SEO",
      "description": "I built a documentation hub around the questions traders were asking about setup and the product."
    }
  },
  "chaddiman": {
    "name": "ChaddiMan",
    "type": "Comics & storytelling",
    "role": "Creator, writer and illustrator",
    "hook": "Explore the comics, the community and the work behind them.",
    "description": "Sometimes a short conversation between two characters says more than a long explanation. That’s where ChaddiMan comes in.",
    "url": "/projects/cynyassy.html",
    "card": {
      "category": "Comics & storytelling",
      "summary": "Comics that make room for life’s messy questions.",
      "role": "Writing · Illustration · Audience building",
      "proof": "100K+ followers",
      "action": "Explore the comics"
    },
    "hero": {
      "skills": [
        "Writing",
        "Illustration"
      ],
      "role": "Writing, illustration and audience building",
      "description": "Original comics about everyday feelings. I built the channel to 100K+ followers."
    },
    "playground": {
      "role": "Writing, illustration and audience building",
      "description": "I built a comic channel to 100K+ followers through original stories and illustrations."
    }
  },
  "adventure": {
    "name": "Design Adventure",
    "type": "Interactive design experiment",
    "role": "Concept, interaction design and development",
    "hook": "Play the full experiment and switch between 22 visual styles.",
    "description": "What if learning about interfaces felt more like playing? Six reactor puzzles became a place to try that out.",
    "url": "/projects/design-adventure.html",
    "card": {
      "category": "Interaction experiment",
      "summary": "Six puzzles. One reactor. 22 ways to play with design.",
      "role": "Interaction design · Development",
      "proof": "22 visual styles",
      "action": "Play the experiment"
    },
    "playground": {
      "role": "Interaction design and development",
      "description": "An interface experiment with six reactor puzzles and 22 visual treatments."
    }
  },
  "perspectives": {
    "name": "Perspectives",
    "type": "Board game & systems thinking",
    "role": "Research, game design, prototyping and facilitation",
    "hook": "Play a small version of the thesis and see how starting conditions change what follows.",
    "description": "My MFA thesis at SVA: a board game that gives people a shared way to explore how starting conditions change what follows.",
    "url": "/projects/perspectives.html",
    "card": {
      "category": "Game & service design",
      "summary": "A board game about how unequal beginnings shape outcomes.",
      "role": "Research · Game & service design",
      "proof": "MFA thesis · SVA",
      "action": "View case study"
    },
    "hero": {
      "skills": [
        "Research",
        "Illustration",
        "Design"
      ],
      "role": "Research, game design, illustration and playtesting",
      "description": "My MFA thesis became a board game about caste, power and access to resources."
    },
    "playground": {
      "role": "Research, game design, illustration and playtesting",
      "description": "My MFA thesis became a facilitated board game about caste, power and access to resources."
    }
  },
  "emotions": {
    "name": "Emotion Identifier",
    "type": "Guided reflection tool",
    "role": "Concept, guided interaction and development",
    "hook": "Try the live tool at your own pace.",
    "description": "Sometimes I know something is going on before I have the words for it. This tool helps turn a broad feeling into something easier to name.",
    "url": "https://cynyassy.github.io/emotions/",
    "card": {
      "category": "Guided reflection tool",
      "summary": "Find the words for what you’re feeling.",
      "role": "Concept · Interaction design · Development",
      "proof": "Interactive tool",
      "action": "Try the tool"
    }
  },
  "book": {
    "name": "Not Everything Is Urgent",
    "type": "Published illustrated book",
    "role": "Writer, illustrator and designer, with Kim and Ian through The Pound Project",
    "hook": "Read a story and see how we made the two-part book.",
    "description": "A book about attention, pressure and remembering that not everything needs us right now. The same simple drawings, with more room to breathe.",
    "url": "/projects/not-everything-is-urgent.html",
    "card": {
      "category": "Published illustrated book",
      "summary": "An illustrated book about attention, pressure and slowing down.",
      "role": "Writing · Illustration · Design",
      "proof": "Published book",
      "action": "See the book"
    },
    "playground": {
      "role": "Co-writing, illustration and book design",
      "description": "I co-wrote the stories, drew the illustrations and designed the layouts for a book in two parts."
    }
  },
  "film": {
    "name": "Film Festival Friday",
    "type": "Filmmaking practice & prompt bot",
    "role": "Creative practice, prompt design and bot development",
    "hook": "A weekend prompt, a small film and a reason to keep making.",
    "description": "I wanted to do more with my love of films than keep a watchlist. A weekly prompt became a reason to watch closely, notice the craft and make something.",
    "url": "/projects/film-festival-friday.html",
    "card": {
      "category": "Filmmaking & creative practice",
      "summary": "Weekly film prompts that turn watching into making.",
      "role": "Creative practice · Bot development",
      "proof": "Film & code",
      "action": "Explore the project"
    }
  },
  "school": {
    "name": "Four Names",
    "type": "Playable social-impact game",
    "role": "Original board-game design, writing, illustration and digital development",
    "hook": "Forty students. Three reviews. What do the marks leave out?",
    "description": "Based on my experience teaching in a Delhi municipal school, this game asks you to submit four names for transfer, then reveals the lives behind their marks. A digital reconstruction of a game I first made at design school.",
    "url": "/projects/school-decision.html",
    "card": {
      "category": "Social-impact game",
      "summary": "A game about the lives that school marks leave out.",
      "role": "Game design · Writing · Illustration · Development",
      "proof": "3 reviews · 12 decisions",
      "action": "Play Four Names"
    },
    "playground": {
      "role": "Game design, writing and development",
      "description": "A school decision game based on my teaching experience. Student stories are fictionalised composites."
    }
  },
  "reset": {
    "name": "Project RESET",
    "type": "Client product & event experience",
    "role": "Production UX, full-stack development, conversation experience and event design",
    "hook": "From a supplied prototype to a working app, event experience and handover.",
    "description": "An interactive companion to a documentary. I built the production check-in and shared Learning Lab, developed the conversation experience, and helped connect the app to the screening itself.",
    "url": "/projects/project-reset.html",
    "card": {
      "category": "Client product & event experience",
      "summary": "Taking a documentary’s companion from prototype to the event screen.",
      "role": "Production UX · Development · Event design",
      "proof": "NYC Climate Week · Columbia screening",
      "action": "View case study"
    }
  }
} as const satisfies Record<string,ProjectContent>;
export type ProjectId=keyof typeof catalogue;
export const projectCatalogue:Readonly<Record<ProjectId,ProjectContent>>=catalogue;
