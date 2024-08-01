import React from 'react';
import ChartSection from 'src/types/ChartSection';
import './ChartSection.css';

interface ChartSectionComponentProps {
  section: ChartSection;
}

export default function ChartSectionComponent(props: ChartSectionComponentProps) {
  return (
    <div className="chart-section">
      <h2 className="chart-section-header">{props.section.sectionname.toUpperCase()}</h2>
      {props.section.lines.map((line) => (
        <React.Fragment>
          <b>C G</b>
          <p>{line.lyrics}</p>
        </React.Fragment>
      ))}
    </div>
  );
}
