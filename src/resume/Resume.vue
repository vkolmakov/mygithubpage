<template>
  <div class="resume">
    <resume-header></resume-header>
    <resume-separator></resume-separator>

    <resume-education></resume-education>
    <resume-separator></resume-separator>

    <resume-experience></resume-experience>
    <resume-separator></resume-separator>

    <resume-technical-skills></resume-technical-skills>
    <resume-separator></resume-separator>

    <resume-projects></resume-projects>
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
        msg: 'Parent message',
        resumeHeader: {
          whoami: {
            name: 'Vladimir Kolmakov',
            link: 'http://vkolmakov.me',
          },
          contacts: [{
            iconClass: 'fa fa-envelope',
            text: 'vkolmako@hawk.iit.edu',
            link: 'mailto:vkolmako@hawk.iit.edu',
          }, {
            iconClass: 'fa fa-github',
            text: 'vkolmakov',
            link: 'https://github.com/vkolmakov',
          }, {
            iconClass: 'fa fa-twitter',
            text: '@vklmkv',
            link: 'http://twitter.com/vklmkv',
          }, {
            iconClass: 'fa fa-bookmark',
            text: 'vkolmakov.me',
            link: 'http://vkolmakov.me',
          }, {
            iconClass: 'fa fa-map-marker',
            text: 'Chicago, IL',
            link: 'https://www.google.com/maps/place/Chicago,+IL/@41.833648,-87.8722379,11z/data=!3m1!4b1!4m5!3m4!1s0x880e2c3cd0f4cbed:0xafe0a6ad09c0c000!8m2!3d41.8781136!4d-87.6297982',
          }]
        },

        resumeEducation: {
          schools: [{
            name: 'Illinois Institute of Technology',
            city: 'Chicago, IL',
            major: 'Bachelor of Science: Computer Science',
            graduation: 'Expected Gratuation: December 2017',
            gpa: '3.9/4.0',
          }],
        },

        resumeExperience: {
          jobs: [{
            company: 'Target',
            city: 'Minneapolis, MN',
            title: 'Software Engineering Intern',
            dates: 'June 2016 - August 2016',
            bulletpoints: [
              'Work as a part of Threat Detection Operations team at Cyber Fusion Center on establishing Mac OSX forensics process.',
              'Build an extensible Mac OSX forensics framework using multiple opensource tools.',
              'Contribute to several internal projects.'
            ],
          }, {
            company: 'Illinois Institute of Technology',
            city: 'Chicago, IL',
            title: 'Teaching Assistant - Data Structures and Algorithms',
            dates: 'August 2016 - present',
            bulletpoints: [
              'Lead lab sessions and assist students with their programming assignments.',
              'Grade student lab assignments.',
            ],
          }, {
            company: 'Wilbur Wright College',
            city: 'Chicago, IL',
            title: 'Mathematics Tutor',
            dates: 'May 2014 - present',
            bulletpoints: [
              'Design and develop a fully functional web-application that allows students to schedule tutoring appointments online.',
              'Provide academic assistance to assigned students with various mathematics courses (calculus, statistics), either individually or in groups.',
            ],
          }],
        },

        resumeTechnicalSkills: {
          languages: ['Python', 'JavaScript/Node.js', 'Java', 'C', 'Scala'],
          technologies: ['React', 'Redux', 'AngularJS', 'Vue', 'Express', 'Django', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Kibana', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'jQuery', 'Git', 'zsh', 'IntelliJ', 'Emacs'],
        },

        resumeProjects: {
          projects: [{
            name: 'Math Emporium',
            bulletpoints: [
              'Self-service web-application that allows students to register using their school email address and schedule tutoring appointments directly at Math Emporium\'s calendar. Has complete integration with Google Calendar and serves as a configurable backend for the Academic Scheduler Chrome extension.',
              'Backend: Node.js, Express, PostgreSQL; front: React, Redux, Sass (Susy + Compass).',
              'Source: <a href="https://github.com/vkolmakov/math-emporium">Github</a> Link: <a href="http://mathemporium.herokuapp.com">mathemporium.herokuapp.com</a>',
            ],
          }, {
            name: 'Academic Scheduler',
            bulletpoints: [
              'Chrome extension that is currently used at Wright College\'s Math Emporium for scheduling appointments. Eliminated any possibility for overbooking/mis-scheduling.',
              'Built with AngularJS and Bootstrap.',
              'Source: <a href="https://github.com/vkolmakov/academic-scheduler-extension">Github</a>',
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

  @mixin resume-md() {
    font-size: 12px;
  }

  @media print {
    div.resume {
      @include resume-md();
      max-width: 600px;
      padding: 30px 0px;
      border: 0px;
      background: #fff;
      box-shadow: none;
      -webkit-box-shadow: none;
      }
  }

  .resume {
    margin: 0 auto;
    max-width: 600px;
    @include breakpoint-md() {
      @include resume-md();
      padding: 80px 100px;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 4px #aaa;
      -webkit-box-shadow: 2px 2px 4px #aaa;
    }

    padding: 1em;
    background: #fff;
    color: #111;
    font-family: 'Computer Modern Serif';
    font-size: 11px;

    a {
      text-decoration: none;
      color: #111;
    }

    h1, h2 {
      @include header();
    }

  }
</style>
