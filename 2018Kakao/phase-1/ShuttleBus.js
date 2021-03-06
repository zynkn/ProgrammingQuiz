/*
**  4. 셔틀버스 (난이도 중)

**  카카오에서는 무료 셔틀버스를 운행하기 때문에 판교역에서 편하게 사무실로 올 수 있다.
**  카카오의 직원은 서로를 '크루'라고 부르는데, 아침마다 많은 크루들이 이 셔틀을 이용하여 출근한다.

**  이 문제에서는 편의를 위해 셔틀은 다음과 같은 규칙으로 운행한다고 가정하자.

**  - 셔틀은 09:00부터 총 n회 t분 간격으로 역에 도착하며, 하나의 셔틀에는 최대 m명의 승객이 탈 수 있다.
**  - 셔틀은 도착했을 때 도착한 순간에 대기열에 선 크루까지 포함해서 대기 순서대로 태우고 바로 출발한다.
**    예를 들어 09:00에 도착한 셔틀은 자리가 있다면 09:00에 줄을 선 크루도 탈 수 있다.

**  일찍 나와서 셔틀을 기다리는 것이 귀찮았던 콘은, 일주일간의 집요한 관찰 끝에 어떤 크루가 몇시에 셔틀 대기열에 도착하는지 알아냈다.
**  콘이 셔틀을 타고 사무실로 갈 수 있는 도착 시각 중 제일 늦은 시각을 구하여라.

**  단, 콘은 게으르기 때문에 같은 시각에 도착한 크루 중 대기열에서 제일 뒤에 선다.
**  또한, 모든 크루는 잠을 자야 하므로 23:59에 집에 돌아간다.
**  따라서 어떤 크루도 다음날 셔틀을 타는 일은 없다.
*/

/*
**  [입력 형식]

**  셔틀 운행 횟수 n, 셔틀 운행 간격 t, 한 셔틀에 탈 수 있는 최대 크루 수 m,
    크루가 대기열에 도착하는 시각을 모은 배열 timetable이 입력으로 주어진다.
**  - 0 < n <= 10
**  - 0 < t <= 60
**  - 0 < m <= 45
**  - timetable은 최소 길이 1이고 최대 길이 2000인 배열로, 하루 동안 크루가 대기열에 도착하는 시각이 HH:MM 형식으로 이루어져 있다.
**  - 크루의 도착 시각 HH:MM은 00:01에서 23:59 사이이다.
*/

/*
**  [출력 형식]

**  콘이 무사히 셔틀을 타고 사무실로 갈 수 있는 제일 늦은 도착 시각을 출력한다.
**  도착 시각은 HH:MM 형식이며, 00:00에서 23:59 사이의 값이 될 수 있다.
*/

/*
**  [입출력 예제]

**  (예제 1)
**  n:1 , t:1 , m:5 , timetable: ['08:00', '08:01', '08:02', '08:03']
**  output  '09:00'

**  (예제 2)
**  n:2 , t:10 , m:2 , timetable: ['09:10','09:09','08:00']
**  output  '09:09'

**  (예제 3)
**  n: 2 , t:1 , m:2 , timetable: ['09:00','09:00','09:00','09:00']
**  output  '08:59'

**  (예제 6)
**  n:10 , t:60 , m:45, timetable: ['23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59']
**  output  '18:00'
*/


var test1 = {
  n:1 ,
  t:1 ,
  m:5 ,
  timetable: ['08:00', '08:01', '08:02', '08:03']
}
var test2 = {
  n:2 ,
  t:10 ,
  m:2 ,
  timetable: ['09:10','09:09','08:00']
}
var test3 = {
  n: 2 ,
  t:1 ,
  m:2 ,
  timetable: ['09:00','09:00','09:00','09:00']
}
var test4 = {
  n:10 ,
  t:60 ,
  m:45,
  timetable: ['23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59','23:59']
}
var test5 = {
  n:1,
  t:1,
  m:1,
  timetable: ['23:59']
}
var test6 = {
  n:1,
  t:1,
  m:5,
  timetable: ['00:01','00:01','00:01','00:01','00:01']
}

function solution(n, t, m, timetable){
  var answer = '';
  const START = 540; // 09:00
  var now = START;
  var last = '';
  var count = 0;
  for(let i = 0; i < timetable.length; i++){
    timetable[i] = timeConvert(timetable[i]);
  }
  timetable.sort(function(a, b) {
    return a - b;
  });

  for(var i = 0; i < n; i++){
    count = 0;
    if(i!=0){
      now+=t;
    }
    for(var j = 0; j < m; j++){
      let pos = 0;
      if(timetable[pos]<=now && timetable.length != 0){
        count++;
        last = timetable.shift();
        pos--;
      }
      pos++;
    }

  }
  if(m > count){
    answer = now;
  }else{
    answer = parseInt(last) - 1;
  }
  answer = convertTime(answer);
  return answer;
}
function timeConvert(time){
   var arr = time.split(':');
   var ans = 0;
   ans += parseInt(arr[0])*60;
   ans += parseInt(arr[1]);
   return ans;
}
function convertTime(time){
  var h = parseInt(time/60);
  var m = time%60;

  return pad(h,2)+":"+pad(m,2)

}
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


console.log(solution(test1.n,test1.t,test1.m,test1.timetable));
console.log(solution(test2.n,test2.t,test2.m,test2.timetable));
 console.log(solution(test3.n,test3.t,test3.m,test3.timetable));
 console.log(solution(test4.n,test4.t,test4.m,test4.timetable));

 console.log(solution(test5.n,test5.t,test5.m,test5.timetable));
 console.log(solution(test6.n,test6.t,test6.m,test6.timetable));
