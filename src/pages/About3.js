import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const About3 = () => {
  const svgRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    

    const sampleData1 = [
        { name: 2016, value1: 67907, value2: 385 },
        { name: 2017, value1: 65830, value2: 487 },
        { name: 2018, value1: 75592, value2: 524 },
        { name: 2019, value1: 75432, value2: 673 },
        { name: 2020, value1: 67612, value2: 1178 },
        ];

    let currentIndex1=0;
    
    // SVG 요소의 너비, 높이, 여백 설정
    const width = 500;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    ////////////////////////////////////
    
    // SVG 요소 생성
    const svg4 = d3.select('#graph4')
    .append('svg')
    .attr("width", width)
    .attr("height", height);

    const g4 = svg4.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);


    // x축 스케일 설정
    const xScale4 = d3.scaleBand()
    .domain(sampleData1.map(d => d.name))
    //.domain(['2016', '2017', '2018', '2019', '2020'])
    .range([0, innerWidth])
    .padding(0.1);

    const yScale4 = d3.scaleLinear()
    .domain([30000,100000])
    .range([innerHeight, 0]);

    const y2Scale4 = d3.scaleLinear()
    .domain([300,1200])
    .range([innerHeight, 0]);


    // x축 그리기
    g4.append('g')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale4));

    // y축 그리기
    g4.append('g')
    .call(d3.axisLeft(yScale4));

    g4.append('g')//동그라미 위 값 쓰기
    .selectAll('.text-black') // 새로운 CSS 클래스 추가
    .data(sampleData1)
    .enter()
    .append('text')
    .attr('class', 'text-black')
    .attr('x', d => xScale4(d.name) + xScale4.bandwidth() / 2)
    .attr('y', d => yScale4(d.value1))
    .attr('text-anchor', 'middle')
    .attr('dy', '-4px')
    .style('fill', 'black')
    .text(d => d.value1);

    g4.append('g')
    .attr('transform', `translate(${innerWidth}, 0)`)
    .call(d3.axisRight(y2Scale4));
//


    //////////좌측상단 색깔 구분글
    const legendGroup = svg4.append('g')
    .attr('transform', `translate(${margin.left + 150}, ${margin.top})`);

    legendGroup.append('text')
    .attr('class', 'legend-text')
    .attr('x', 0)
    .attr('y', 0)
    .style('fill', 'green')
    .text('실종자 현황');

    legendGroup.append('text')
    .attr('class', 'legend-text')
    .attr('x', 0)
    .attr('y', 20)
    .style('fill', 'red')
    .text('미발견 실종자');

    ///////////

    // const line1 = d3
    // .line()
    // .x(d => xScale4(d.name) + xScale4.bandwidth() / 2)
    // .y(d => yScale4(d.value1));

    const line2 = d3
    .line()
    .x(d => xScale4(d.name) + xScale4.bandwidth() / 2)
    .y(d => y2Scale4(d.value2));

    function drawGraph(sampleData1) {

        const bars1 = g4.selectAll('.bar1')
        .data(sampleData1)
        .enter()
        .append('rect')
        .attr('class', 'bar1')
        .attr('x', d => xScale4(d.name) + xScale4.bandwidth() / 4)
        .attr('y', d => yScale4(d.value1))
        .attr('width', xScale4.bandwidth() / 2)
        .attr('height', d => innerHeight - yScale4(d.value1))
        .attr('fill', 'black');

        // 새로운 데이터를 기반으로 그래프 업데이트
        // g4.append('path')
        // .datum(sampleData1)
        // .attr('class', 'line1')
        // .attr('fill', 'none')
        // .attr('stroke', 'black')
        // .attr('stroke-width', 2)
        // .attr('d', line1);
        
        g4.append('path')
        .datum(sampleData1)
        .attr('class', 'line2')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('d', line2)
        .selectAll('y2Scale4')
        .style('text','red');

        bars1.enter()
        .append('rect')
        .attr('class', 'bar1')
        .attr('x', d => xScale4(d.name) + 14 + xScale4.bandwidth() / 2 - xScale4.bandwidth() / 4)
        .attr('y', d => yScale4(d.value1))
        .attr('width', xScale4.bandwidth())
        .attr('height', d => innerHeight - yScale4(d.value1))
        .merge(bars1)
        .attr('fill', 'green');
        //.attr('y', d => yScale(d.value1))

        // g4.selectAll('.circle1')
        //     .data(sampleData1)
        //     .enter()
        //     .append('circle')
        //     .attr('class', 'circle1')
        //     //.attr('cx, d => xScale4(d.name) + xScale4.bandwidth() / 2')
        //     //.attr('cx', d => xScale4(d.name) + 10 + xScale4.bandwidth() / 2 - xScale4.bandwidth() / 4)// + xScale4.bandwidth() / 2
        //     .attr('cx', d => xScale4(d.name) + 14 + xScale4.bandwidth() / 2 - xScale4.bandwidth() / 4)// + xScale4.bandwidth() / 2
        //     .attr('cy', d => yScale4(d.value1))
        //     .attr('r', 4)
        //     .attr('fill', 'black');

        g4.selectAll('.circle2')
            .data(sampleData1)
            .enter()
            .append('circle')
            .attr('class', 'circle2')
            //.attr('cx, d => xScale4(d.name) + xScale4.bandwidth() / 2')
            .attr('cx', d => xScale4(d.name) + 17 + xScale4.bandwidth() / 2 - xScale4.bandwidth() / 4)// + xScale4.bandwidth() / 2
            .attr('cy', d => y2Scale4(d.value2))
            .attr('r', 4)
            .attr('fill', 'red');

        
        } 
        
    drawGraph(sampleData1);
    
    g4.append('g')//동그라미 위 값 쓰기
    .selectAll('.text-red') // 새로운 CSS 클래스 추가
    .data(sampleData1)
    .enter()
    .append('text')
    .attr('class', 'text-red')
    .attr('x', d => xScale4(d.name) + xScale4.bandwidth() / 2)
    .attr('y', d => y2Scale4(d.value2) - 10)
    .attr('text-anchor', 'middle')
    .attr('dy', '-4px')
    .style('fill', 'red')
    .text(d => d.value2);
    

    const sample = [
        { name: "1시간", value1: 2100},
        { name: "3시간", value1: 321},
        { name: "12시간", value1: 37},
        { name: "3일", value1: 19},
        { name: "7일", value1: 56},
        { name: "1년", value1: 132}
        ];

    // SVG 요소의 너비, 높이, 여백 설정
    // const width = 400;
    // const height = 400;
    // const margin = { top: 40, right: 40, bottom: 30, left: 60 };
    // const innerWidth = width - margin.left - margin.right;
    // const innerHeight = height - margin.top - margin.bottom;

    const svg5 = d3.select('#graph5')
    .append('svg')
    .attr("width", 700)
    .attr("height", height);

    const g5 = svg5.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);


    // x축 스케일 설정
    const xScale5 = d3.scaleBand()
    .domain(sample.map(d => d.name))
    .range([0, 600])
    .padding(0.1);

    const yScale5 = d3.scaleLinear()
    .domain([0,2500])
    .range([innerHeight, 0]);

    // x축 그리기
    g5.append('g')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale5));

    // y축 그리기
    g5.append('g')
    .call(d3.axisLeft(yScale5));

    g5.append('g')//동그라미 위 값 쓰기
    .selectAll('.text-blue') // 새로운 CSS 클래스 추가
    .data(sample)
    .enter()
    .append('text')
    .attr('class', 'text-blue')
    .attr('x', d => xScale5(d.name) + xScale5.bandwidth() / 2)
    .attr('y', d => yScale5(d.value1))
    .attr('text-anchor', 'middle')
    .attr('dy', '-4px')
    .style('fill', 'black')
    .text(d => d.value1);

    const line1 = d3
    .line()
    .x(d => xScale5(d.name) + xScale5.bandwidth() / 2)
    .y(d => yScale5(d.value1));
///////
    const legendGroup1 = svg5.append('g')
    .attr('transform', `translate(${margin.left + 100}, ${margin.top})`);

    legendGroup1.append('text')
    .attr('class', 'legend-text1')
    .attr('x', 0)
    .attr('y', 50)
    .style('fill', 'black')
    .style('font-size','20px')
    .text('시간이 지날수록 실종해제는 급격히 어려워집니다.');
//////////
    function drawGraph1(sample) {

        // 새로운 데이터를 기반으로 그래프 업데이트
        g5.append('path')
        .datum(sample)
        .attr('class', 'line1')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('d', line1)
        .selectAll('y2Scale4')
        .style('text','blue');

        // g4.append('path')
        // .datum(sampleData1)
        // .attr('class', 'line2')
        // .attr('fill', 'none')
        // .attr('stroke', 'red')
        // .attr('stroke-width', 2)
        // .attr('d', line2)
        // .selectAll('y2Scale4')
        // .style('text','red');

        g5.selectAll('.circle3')
        .data(sample)
        .enter()
        .append('circle')
        .attr('class', 'circle3')
        .attr('cx', d => xScale5(d.name) + 22 + xScale5.bandwidth() / 2 - xScale5.bandwidth() / 4)// + xScale4.bandwidth() / 2
        .attr('cy', d => yScale5(d.value1))
        .attr('r', 4)
        .attr('fill', 'black');

    } 

    drawGraph1(sample);
/////////////////////////////////////////////
    const sampleData2 = [
        { name: 2016, value1: 67907, value2: 61 },
        { name: 2017, value1: 65830, value2: 52 },
        { name: 2018, value1: 75592, value2: 50 },
        { name: 2019, value1: 75432, value2: 25 },
        { name: 2020, value1: 67612, value2: 134 },
        ];

    let currentIndex2 = 0;

    // SVG 요소 생성
    const svg2 = d3.select('#graph2')
    .append('svg')
    .attr("width", width)
    .attr("height", height);

    const g2 = svg2.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    const text2 = g2.append('text')
    .attr('class', 'value-text')
    .attr('x', innerWidth / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle');

    const xScale2 = d3.scaleBand()
        .domain(['실종자 수', '몽타주 작성 수'])
        .range([(innerWidth / 4), (innerWidth / 4) * 3])
        .padding(0.1);

    const yScale2 = d3.scaleLinear()
        .domain([100000, 30000])
        .range([0, innerHeight]);

    const y2Scale2 = d3.scaleLinear()
        .domain([200, 0])
        .range([0, innerHeight]);


    g2.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale2));

    g2.append('g')
        .call(d3.axisLeft(yScale2));

    g2.append('g')
        .attr('transform', `translate(${innerWidth}, 0)`)
        .call(d3.axisRight(y2Scale2));


    function updateGraph2(sampleData2) {
        const bars1 = g2.selectAll('.bar1')
            .data([sampleData2], d => d.name);

        const bars2 = g2.selectAll('.bar2')
            .data([sampleData2], d => d.name);

        bars1.enter()
            .append('rect')
            .attr('class', 'bar1')
            .attr('x', d => xScale2('실종자 수') - (xScale2.bandwidth() / 2) )
            .attr('y', innerHeight)
            .attr('width', xScale2.bandwidth())
            .attr('height', 0)
            .merge(bars1)
            .transition()
            .duration(700)
            .attr('x', d => xScale2('실종자 수') - (xScale2.bandwidth() / 2))
            .attr('y', d => yScale2(d.value1))
            .attr('height', d => innerHeight - yScale2(d.value1));

        bars2.enter()
            .append('rect')
            .attr('class', 'bar2')
            .attr('x', d => xScale2('몽타주 작성 수') + (xScale2.bandwidth() / 2))
            .attr('y', innerHeight)
            .attr('width', xScale2.bandwidth())
            .attr('height', 0)
            .merge(bars2)
            .transition()
            .duration(700)
            .attr('x', d => xScale2('몽타주 작성 수') + (xScale2.bandwidth() / 2))
            .attr('y', d => y2Scale2(d.value2))
            .attr('width', xScale2.bandwidth())
            .attr('height', d => innerHeight - y2Scale2(d.value2));

        text2.transition()
            .duration(700)
            .tween('text', function (d) {
                const self = this;
                const i = d3.interpolateNumber(this.textContent, sampleData2.name);
                return function (t) {
                    self.textContent = Math.round(i(t));
                };
            });
        bars1.exit().remove();
        bars2.exit().remove();
    }

    setInterval(() => {
        updateGraph2(sampleData2[currentIndex2]); // 그래프 업데이트
        currentIndex2 = (currentIndex2 + 1) % (sampleData2.length); // 인덱스를 업데이트하여 다음 데이터로 이동
    }, 3000);

//////////////
    const data1 = [
        { name: "시민의 제보", value: 59.9},
        { name: "무작위 탐색", value: 12.3},
        { name: "우연한 발견", value: 10.7},
        { name: "기타", value: 24},
        { name: "기술적인 도움", value: 3.1}
        ];
    // SVG 요소의 너비, 높이, 반지름 등 설정
    const w = 400;
    const h = 400;
    const r = Math.min(w, h) / 2;
    //const colorData = ["red", "orange", "yellow", "blue", "purple"];
    // SVG 요소 생성
    const svg = d3.select('#graph')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('transform', `translate(${w / 2}, ${h / 2})`);

    // 색상 스케일 정의
    //const color = d3.scaleOrdinal(d3.schemeCategory10);
    const color = d3.scaleOrdinal([
    "#ff9800",
    "#ffa726",
    "#ffb74d",
    "#ffcc80",
    "#ffe0b2",
  ]);

    // 파이 레이아웃 설정
    const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

    // 아크 생성
    const arc = d3.arc()
    .innerRadius(r-110)
    .outerRadius(r);

    // 데이터 바인딩
    const arcs = svg.selectAll('arc')
    .data(pie(data1))
    .enter()
    .append('g')
    .attr('class', 'arc');

    // 아크 그리기
    arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i));

    
    // 아크에 레이블 추가
    // 아크에 레이블 추가
    arcs.append('text')
    .attr('class','text4')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => `${d.data.name}: ${d.data.value}%`);



///////////
    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid black")
        .style("padding", "5px")
        .style("opacity", 0);

    const initialScale = 6000; //확대시킬 값
    const initialX = -12870; //초기 위치값 X
    //const initialX = -12350; //초기 위치값 X
    const initialY = 4450; //초기 위치값 Y
    //const initialY = 4050; //초기 위치값 Y

    console.dir(d3.geoPath())
    const projection = d3.geoMercator()
        .scale(initialScale)
        .translate([initialX, initialY]);

    function zoomed(event) {
        const { transform } = event;
        g3.attr("transform", transform);
        g3.attr("stroke-width", 1 / transform.k);
    }
    
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);

    const width1=1000;
    const height1=1000;
    const svg3 = d3.select('#graph3')
        .append('svg')
        .attr('width', 1000)
        .attr('height', 1000)

    const g3 = svg3.append('g')

    d3.json("../korea.json")
        .then(json => {
            console.log(json)

            g3.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", d3.geoPath().projection(projection))
                .attr("class", "countries")
                .on("click", clicked) // 클릭 이벤트 추가

            g3.selectAll('text')
                .data(json.features)
                .enter()
                .append("text")
                .attr('transform', function(d) {
                    let locate = d3.geoPath().projection(projection).centroid(d);
                    return `translate(${locate[0]}, ${locate[1]})`
                })
                .text(d => d.properties.name)
                .attr('text-anchor', 'middle');

            d3.json("../missingPersons.json")
            .then(function(data) {
                data.forEach(function(person) {
                    var latitude = person.latitude;
                    var longtitude = person.longtitude;

                    g3.append("circle")
                        .attr("cx", projection([longtitude, latitude])[0])
                        .attr("cy", projection([longtitude, latitude])[1])
                        .attr("r", 5)
                        .attr("fill", "red")
                        .attr("stroke", "hotPink")
                        .attr("stroke-width", 1)
                        .on("mouseover", function(event, d) {
                                tooltip.transition()
                                    .duration(200)
                                    .style("opacity", .9);
                                tooltip.html("이름: " + person.name + "<br/>" +
                                        "성별: " + person.sex_code + "<br/>" +
                                        "실종 일자: " + person.occur_date + "<br/>" +
                                        "실종 주소: " + person.occur_adres)
                                        .style("left", (event.pageX + 10) + "px")
                                        .style("top", (event.pageY - 28) + "px");
                                    })
                        .on("mouseout", function(event, d) {
                                tooltip.transition()
                                    .duration(500)
                                    .style("opacity", 0);
                                });
                    });
                
            })
            .catch(function(err) {
                console.log('실패!!');
                console.error(err);
            });
            function clicked(event, d) {
            const [[x0, y0], [x1, y1]] = d3.geoPath().projection(projection).bounds(d); // 경로의 경계를 계산합니다.
            event.stopPropagation(); // 이벤트 버블링(stop propagation)을 막습니다.
            g3.selectAll(".countries").transition().style("fill", null); // 모든 경로의 색상을 초기화합니다.
            d3.select(this).transition().style("fill", "#551111"); // 클릭한 경로의 색상을 변경합니다.
            svg3.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(width1 / 2, height1 / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width1, (y1 - y0) / height1)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.pointer(event, svg3.node())
            );
        }

        
        svg3.call(zoom); // 줌(zoom) 이벤트를 svg에 적용합니다.
        })
        .catch(function (err) {
            console.log('실패!!');
            console.error(err);
        });

  }, []);

  return (
    <div>
        
    <h1> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;실종자 현황   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        2018년도 실종 이후 소요 시간 별 실종해제 수
    </h1>
    <svg id="graph4" width="500px" height="400px"></svg>
    <svg id="graph5" width="700px" height="400px"></svg>
    <h3>현재 적지 않은 수의 실종자들이 가족 품으로 돌아가지 못하고 있습니다.
        실종자 수는 매년 수만명에 달하지만, 미해제 실종자 수는 꾸준히 증가하는 추세입니다.

        실종자의 실종해제는 시간이 갈수록 점점 어려워집니다.

        저희의 서비스는 실종자들이 빠르게 가족들의 품으로 돌아가게 도울 것입니다.
    </h3>
    <h1>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;몽타주 작성 현황 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        실종자 발견 요인</h1>
    <svg id="graph2" width="500px" height="400px"></svg>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <svg id="graph" width="500px" height="400px"></svg>
    <h3>대부분의 실종자가 시민의 제보를 통해 가족들의 품으로 돌아가지만,
        실제로 다양한 법적 이유로 몽타주 작성은 어려운 현실에 놓여있습니다. 
        저희 서비스는 홈페이지를 통해 실종자들의 실종 해제를 도울 것입니다.
    </h3>
    <h1>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;지역 별 실종자 분포</h1>
    <svg id="graph3" width="1000px" height="800px"></svg>
    <h3>해당 지도를 통해 전국에 있는 실종자들의 정보와 분포를 확인 가능합니다.
        지역을 클릭하여 확대된 지도에서 확인 가능합니다.
    </h3>
    </div>
  );
};

export default About3;
