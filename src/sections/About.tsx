import { Section } from "@/components/Section";

export function AboutSection() {
  return (
    <Section id="about" title="About" subtitle="Introduction">
      <div className="propose dark:prose-invert">
        <p>
          ⌨️ Without noticing a thing, I have had my exposure to coding while I
          was in HighSchool through an ICT Teacher. We were instructed to use
          HTML & CSS on Notepad++ to create websites, but were confused about it
          and end up hating the lectures. <br />
          <br />
          🎒 While in Universtiy, I got a chance to introduce myself with C++,
          MySQL, Java, Embedded C, JavaScript & PHP. <br />
          <br />
          🎓 After graduation, I have worked with Node.js, Express, EJS, git,
          React and MongoDB. Currently I am focusing on OracleDB and trying my best
          to improve myself as a programmer.
        </p>
      </div>
    </Section>
  );
}
