import type { Locale, LocaleId } from './types.ts'

export const languages: Record<string, Locale> = {
  fr: {
    code: 'fr-FR',
    label: '🇫🇷 Français',
    translations: {
      rss: {
        title: 'Blog de Timothée Rebours',
        description: 'Dans ce blog, je parle de changement climatique, de politique, d\'économie, de religion, de cybersécurité et d\'autres sujets qui m\'intéressent.'
      },
      index: {
        h1: 'Bonjour!',
        subtitle: "Je suis un entrepreneur de la tech habitant en France, je m'emploie à apporter aux développeurs du chiffrement de bout-en-bout avec {0}.",
        seald: 'Seald',
        title: 'Timothée Rebours',
        description: 'Mon site personnel, n\'en attendez pas trop'
      },
      'about-me': {
        title: 'À propos de moi',
        description: 'Expérience, formation, centres d\'intérêt, ...',
        h1: 'À propos de moi',
        subtitle: 'Je suis né en 1993 près de Paris, j\'ai toujours été passionné de sciences et technologies. Je suis ingénieur diplômé de l\'École Polytechnique , et j\'ai créé mon entreprise dans le domaine de la cybersécurité.',
        'areas-of-interest': 'Centres d\'intérêt',
        'area-1-title': 'Numérique',
        'area-1-p': 'Nous avons tous un ordinateur dans notre poche, qui nous permet d\'apprendre n\'importe quoi, de commander n\'importe quoi, de communiquer avec tout le monde. Et nous l\'utilisons pour regarder des vidéos de chats {0}.',
        'area-2-title': 'Sciences',
        'area-2-p': 'Je suis profondément intéressé par la compréhension du fonctionnement des choses à un niveau fondamental, qu\'il s\'agisse de physique (même si je suis dépassé), de chimie, de mécanique, de biologie, d\'ingénierie...',
        'area-3-title': 'Politique et géopolitique',
        'area-3-p': 'Quand j\'étais enfant, je disais apparemment que je voulais devenir président. Ce n\'est plus le cas aujourd\'hui, mais j\'ai toujours envie de participer au débat public. D\'ailleurs, si j\'ai créé tout ce site, c\'est pour me forcer à faire des recherches avant de donner mon avis.',
        'area-4-title': 'Les chats',
        'area-4-p': 'Voici mon petit démon adoré :',
        'job-experiences': 'Expérience professionnelle',
        'job-1-date': '2016-aujourd\'hui',
        'job-1-company': 'Seald',
        'job-1-title': 'Co-fondateur & Président',
        'job-1-description': 'J\'ai fondé {0} en 2016 avec 3 autres cofondateurs. Notre mission est d\'aider à protéger les données sur le web, et nous croyons fermement que cela ne peut se faire qu\'à travers une architecture zéro confiance, un chiffrement à grain fin et si possible un chiffrement de bout en bout. <br/> Notre proposition de valeur est d\'apporter le chiffrement de bout en bout et d\'autres outils aux développeurs afin qu\'ils puissent construire des applications sécurisées dès la conception.',
        education: 'Éducation',
        'education-1-date': '2012-2016',
        'education-1-name': 'École Polytechnique',
        'education-1-description': 'L\'École Polytechnique fait partie des établissements d\'enseignement supérieur les mieux classés de France. <br/> J\'ai suivi des cours généralistes tels que l\'informatique, les mathématiques appliquées et la relativité restreinte pendant les deux premières années. <br/> Pendant les deux années suivantes (M1 et M2), j\'ai suivi des cours orientés vers l\'entrepreneuriat tels que le droit, la gestion d\'entreprise, l\'innovation et je suis allé à l\'UC Berkeley dans le cadre du programme Learn2Launch. <br/>J\'ai fini par créer Seald dans le cadre de mon stage de fin d\'études.'
      },
      blog: {
        title: 'Blog',
        description: 'Mes élucubrations sur la technologie, la politique, le changement climatique, ...',
        h1: 'Blog',
        subtitle: 'Dans ce blog, je parle de changement climatique, de politique, d\'économie, de religion, de cybersécurité et d\'autres sujets qui m\'intéressent.',
        disclaimer: 'Je n\'exprime ici que mon opinion, si vous pensez que j\'ai fait une erreur ou que mon opinion est faussée, n\'hésitez pas à me contacter !',
        published: 'Publié {0}'
      },
      layout: {
        'language-selector': 'Changer de langue',
        'hosted-at': 'Ce site est hébergé avec Github Pages, le code source est {0}.',
        'available-here': 'disponible ici',
        blog: 'Blog',
        'about-me': 'À propos',
        tip: 'Conseil',
        note: 'Note',
        caution: 'Attention',
        danger: 'Danger'
      }
    }
  },
  en: {
    code: 'en-US',
    label: '🇺🇸 English',
    translations: {
      rss: {
        title: 'Timothée Rebours\'s blog',
        description: 'In this blog, I talk about climate change, politics, economics, religion, cybersecurity, and other topics I find interesting.'
      },
      index: {
        h1: 'Hey!',
        subtitle: 'I\'m a tech entrepreneur based in France, involved in bringing end-2-end encryption to developers with {0}.',
        seald: 'Seald',
        title: 'Timothée Rebours',
        description: 'My personal website, don\'t expect too much'
      },
      'about-me': {
        title: 'About me',
        h1: 'About me',
        description: 'Experience, education, interests, ...',
        subtitle: 'I was born in 1993 near Paris, I have always been passionate about science and technology. I\'m an engineer from the École Polytechnique, and I founded my company in cybersecurity.',
        'areas-of-interest': 'Areas of interest',
        'area-1-title': 'Digital technologies',
        'area-1-p': 'We all have a computer in our pockets, which allow us to learn anything, order anything, communicate with everybody. And we use it for watching cat videos {0}.',
        'area-2-title': 'Science',
        'area-2-p': 'I am deeply interested in understanding how things work at a fundamental level, whether it\'s physics (even if I\'m out of my depth), chemistry, mechanics, biology, engineering...',
        'area-3-title': 'Politics & geopolitics',
        'area-3-p': 'When I was a kid, I apparently said I wanted to become President. I don\'t want that anymore, but I still have an urge to participate in the public debate. By the way, I made this entire website because I want to force myself to make some research when giving my opinion.',
        'area-4-title': 'Cats',
        'area-4-p': 'I present you my beloved little demon:',
        'job-experiences': 'Job experiences',
        'job-1-date': '2016-present',
        'job-1-company': 'Seald',
        'job-1-title': 'Co-founder & CEO',
        'job-1-description': 'I founded {0} in 2016 with 3 other co-founders. Our mission is to help protect data on the web, and we strongly believe this can only be done through a zero-trust architecture, fine-grained encryption and if possible end-2-end encryption. <br/> Our value proposition is to bring end-to-end encryption and other tools to developers so that they can build secure by design applications.',
        education: 'Education',
        'education-1-date': '2012-2016',
        'education-1-name': 'École Polytechnique',
        'education-1-description': 'École Polytechnique is among the top-ranked higher education institutions in France.<br/> I studied generalist courses such as computer science, applied mathematics and special relativity during the first two years.<br/> During the next two years (M1 and M2), I studied entrepreneurship-oriented courses such as law, company management, innovation and went to UC Berkeley in the Learn2Launch program.<br/> I actually ended up creating Seald as my last year internship.'
      },
      blog: {
        title: 'Blog',
        description: 'My ranting about tech, politics, climate change, ...',
        h1: 'Blog',
        subtitle: 'In this blog, I talk about climate change, politics, economics, religion, cybersecurity, and other topics I find interesting.',
        disclaimer: 'I only express my opinion here, if you think I made a mistake or that my opinion is flawed, feel free to contact me!',
        published: 'Published {0}'
      },
      layout: {
        'language-selector': 'Switch lang',
        'hosted-at': 'This website is hosted with Github Pages, the source code is {0}.',
        'available-here': 'available here',
        blog: 'Blog',
        'about-me': 'About me',
        tip: 'Tip',
        note: 'Note',
        caution: 'Caution',
        danger: 'Danger'
      }
    }
  }
}

export const defaultLang: LocaleId = 'en'
