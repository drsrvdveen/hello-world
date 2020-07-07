// https://twitter.com/naoto_hieda/status/1278775727308111874

 _ = [N = 0]
 draw = a => {
   N || createCanvas(W = 400, W)//+pixelDensity(1)+createLoop({duration:8, framesPerSecond: 30, gif:true})
   background(0)
   _[N++ % W] = [f = (r = random)(W), g=r(W), W - f, 99,noise(f/99,g/99)>.6?4:-2]
   _.map(a => 
     _.map(([n, r,,,q]) => {
       m = mag(y = a[1] - r,x = a[0] - n)
       m&&m < 30 && (a[3]+=q,B=atan2(y,x), stroke(a), line(a[0] += cos(B), a[1] += sin(B),n,r))//circle(a[4] += cos(B), a[5] += sin(B),4))
     })
   )
 };