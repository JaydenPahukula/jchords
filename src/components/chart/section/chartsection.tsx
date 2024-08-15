import React from 'react';
import ChartSection from 'src/types/chartsection';
import renderLine from 'src/utils/renderline';
import './chartsection.css';

interface ChartSectionComponentProps {
  section: ChartSection;
}

export default function ChartSectionComponent(props: ChartSectionComponentProps) {
  return (
    <div className="chart-section">
      <h2 className="chart-section-header">{props.section.sectionname.toUpperCase()}</h2>
      {props.section.lines.map((line) => {
        const [lyricLine, chordsLine] = renderLine(line);
        return (
          <React.Fragment key={line.lyrics}>
            <b>{chordsLine}</b>
            <p>{lyricLine}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
}
