<template>
  <div class="resume">
    <resume-header :data="header"></resume-header>
    <resume-separator></resume-separator>

    <resume-education :data="education"></resume-education>
    <resume-separator></resume-separator>

    <resume-experience :data="experience"></resume-experience>
    <resume-separator></resume-separator>

    <resume-technical-skills :data="technicalSkills"></resume-technical-skills>
    <resume-separator></resume-separator>

    <resume-projects :data="projects"></resume-projects>
  </div>
</template>

<script>
  import ResumeHeader from './components/ResumeHeader.vue'
  import ResumeEducation from './components/ResumeEducation.vue'
  import ResumeExperience from './components/ResumeExperience.vue'
  import ResumeTechnicalSkills from './components/ResumeTechnicalSkills.vue'
  import ResumeProjects from './components/ResumeProjects.vue'
  import ResumeSeparator from './components/ResumeSeparator.vue'

  export default {
    components: {
      ResumeHeader,
      ResumeEducation,
      ResumeExperience,
      ResumeTechnicalSkills,
      ResumeProjects,
      ResumeSeparator,
    },

    data () {
      return {
        header: {
          whoami: {
            name: 'Vladimir Kolmakov',
            link: 'http://vkolmakov.me',
            label: 'Link to personal website'
          },
          contacts: [{
            iconClass: 'fa fa-envelope',
            text: 'vkolmako@hawk.iit.edu',
            link: 'mailto:vkolmako@hawk.iit.edu',
            label: 'Email address',
          }, {
            iconClass: 'fa fa-github',
            text: 'vkolmakov',
            link: 'https://github.com/vkolmakov',
            label: 'Github',
          }, {
            iconClass: 'fa fa-linkedin-square',
            text: 'vkolmakov',
            link: 'https://www.linkedin.com/in/vkolmakov/',
            label: 'LinkedIn',
          }, {
            iconClass: 'fa fa-map-marker',
            text: 'Chicago, IL',
            link: 'https://www.google.com/maps/place/Chicago,+IL/@41.833648,-87.8722379,11z/data=!3m1!4b1!4m5!3m4!1s0x880e2c3cd0f4cbed:0xafe0a6ad09c0c000!8m2!3d41.8781136!4d-87.6297982',
            label: 'Location',
          }]
        },

        education: {
          schools: [{
            name: 'Illinois Institute of Technology',
            city: 'Chicago, IL',
            major: 'Bachelor of Science: Computer Science',
            graduation: 'Expected Graduation: December 2017',
            gpa: '3.86/4.0',
          }],
        },

        experience: {
          jobs: [{
            company: 'kCura',
            city: 'Chicago, IL',
            title: 'Software Engineering Intern',
            dates: 'June 2017 - present',
            bulletpoints: [
              'Improved developer experience by adding incremental builds and fully automating build process for the web component library, which resulted in average raw time savings of 92% per build.',
              'Made a contribution to Choices.js open-source library with accessibility improvements.',
              'Contributed to multiple projects, including SkateJS-based web component library, Aurelia and AngularJS based applications.'
            ],
          }, {
            company: 'Target',
            city: 'Minneapolis, MN',
            title: 'Software Engineering Intern',
            dates: 'June 2016 - August 2016',
            bulletpoints: [
              'Worked with the Threat Detection Operations team at the Cyber Fusion Center on establishing Mac OSX forensics process.',
              'Built an extensible Mac OSX forensics framework using multiple opensource tools.',
              'Contributed to several internal projects.'
            ],
          }, {
            company: 'Illinois Institute of Technology',
            city: 'Chicago, IL',
            title: 'Teaching Assistant - Data Structures and Algorithms',
            dates: 'August 2016 - May 2017',
            bulletpoints: [
              'Hosted lab sessions and assisted students with their programming assignments.',
              'Evaluated student lab assignments.',
            ],
          }, {
            company: 'Wilbur Wright College',
            city: 'Chicago, IL',
            title: 'Mathematics Tutor',
            dates: 'May 2014 - May 2017',
            bulletpoints: [
              'Designed and developed a fully functional web-application that allows students to schedule tutoring appointments online.',
              'Provided academic assistance to assigned students with various mathematics courses (calculus, statistics), either individually or in groups.',
            ],
          }],
        },

        technicalSkills: {
          languages: ['JavaScript/Node.js', 'Python', 'Elm', 'Scala', 'Haskell', 'Java', 'C'],
          technologies: ['React', 'Redux', 'AngularJS', 'Vue.js', 'Express', 'Django', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Kibana', 'RxJS', 'Webpack', 'jspm', 'HTML5', 'CSS3', 'Sass', 'jQuery'],
          tools: ['Git', 'zsh', 'IntelliJ', 'Emacs'],
        },

        projects: {
          projects: [{
            name: 'Math Emporium',
            bulletpoints: [
              'Self-service web application that allows students to login using their school email address and schedule tutoring appointments directly at Math Emporium\'s calendar. Has complete integration with Google Calendar and serves as a configurable backend for the Academic Scheduler Chrome extension.',
              'Backend: Node.js, Express, PostgreSQL, MongoDB. Frontend: React, Redux, Sass.',
              'Source: <a href="https://github.com/vkolmakov/math-emporium">Github</a> Link: <a href="http://tutoringatwright.com">tutoringatwright.com</a>',
            ],
          }, {
            name: 'Face Recognition Attendance System',
            bulletpoints: [
              'Web application designed to seamlessly maintain attendance at schools using face recognition.',
              'Built with Vue.js, RxJS and OpenFace.',
              'Source: <a href="https://github.com/vkolmakov/Facial-Recognition-Attendance">Github</a>',
            ],
          }]
        }
      }
    }
  }
</script>

<style lang="sass">
  @import "./ComputerModern/cmun-serif.css";
  @import "./mixins";

  @media (min-width: $large-screen-size) {
    :root {
      font-size: 1.15em;
    }
  }

  @media (min-width: $medium-screen-size) and (max-width: $large-screen-size) {
    :root {
      font-size: 0.9em;
    }
  }

  @media (min-width: $small-screen-size) and (max-width: $medium-screen-size) {
    :root {
      font-size: 1.1em;
    }
  }

  @media (min-width: $tiny-screen-size) and (max-width: $small-screen-size) {
    :root {
      font-size: 1.05em;
    }
  }

  @media (max-width: $tiny-screen-size) {
    :root {
      font-size: 0.95em;
    }
  }

  .resume {
    max-width: 50em;

    padding: 1em;
    margin: 0 auto;

    background: #fff;
    color: #333;
    font-family: 'Computer Modern Serif';

    h1 {
      margin: 0.1em 0;
    }

    h2 {
      @include header;
    }

    @include breakpoint-medium-screen {
      padding: 3.5em 6em;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 4px #aaa;
    }
  }

  .resume a {
    text-decoration: none;
    color: #111;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  @media print {
    .resume {
      font-size: 12px;
      border: 0;
      padding: 8px 0 0 0;
      margin: 0 auto;

      color: #111;
      background-color: #fff;
      box-shadow: none;

    }
  }
</style>
