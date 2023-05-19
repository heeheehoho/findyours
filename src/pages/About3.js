import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, axisBottom, axisLeft, axisRight } from "d3";
import "../pages.css";

const About3 = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const sampleData = [
      { name: 2016, value1: 67907, value2: 385 },
      { name: 2017, value1: 65830, value2: 487 },
      { name: 2018, value1: 75592, value2: 524 },
      { name: 2019, value1: 75432, value2: 673 },
      { name: 2020, value1: 67612, value2: 1178 },
    ];

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 40, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = scaleBand()
      .domain(["실종자 수", "미발견 실종자 수"])
      .range([innerWidth / 4, (innerWidth / 4) * 3])
      .padding(0.1);

    const yScale = scaleLinear().domain([100000, 30000]).range([0, innerHeight]);

    const y2Scale = scaleLinear().domain([1200, 300]).range([0, innerHeight]);

    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(axisBottom(xScale));

    g.append("g").call(axisLeft(yScale));

    g.append("g")
      .attr("transform", `translate(${innerWidth}, 0)`)
      .call(axisRight(y2Scale));

    function updateGraph(data) {
      const bars1 = g.selectAll(".bar1").data([data], (d) => d.name);
      const bars2 = g.selectAll(".bar2").data([data], (d) => d.name);

      bars1
        .enter()
        .append("rect")
        .attr("class", "bar1")
        .attr("x", (d) => xScale("실종자 수") - xScale.bandwidth() / 2)
        .attr("y", innerHeight)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .merge(bars1)
        .transition()
        .duration(3000)
        .attr("x", (d) => xScale("실종자 수") - xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.value1))
        .attr("height", (d) => innerHeight - yScale(d.value1));

      bars2
        .enter()
        .append("rect")
        .attr("class", "bar2")
        .attr("x", (d) => xScale("미발견 실종자 수") + xScale.bandwidth() / 2)
        .attr("y", innerHeight)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .merge(bars2)
        .transition()
        .duration(3000)
        .attr("x", (d) => xScale("미발견 실종자 수") + xScale.bandwidth() / 2)
        .attr("y", (d) => y2Scale(d.value2))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => innerHeight - y2Scale(d.value2));
    }

    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % sampleData.length;
      updateGraph(sampleData[currentIndex]);
    }, 3000);
  }, []);

  return (
    <div>
      <h1 className="logo">실종현황 페이지</h1>
      <svg ref={svgRef} width="500px" height="500px">
        <g id="chartContainer"></g>
      </svg>
    </div>
  );
};

export default About3;
