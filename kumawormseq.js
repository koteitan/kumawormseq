/* Kuma Worm Sequence by Kanrokoti */
/* [1] Kanrokoti, "Kuma Worm Sequence", Googology wiki User blog, April  2021. https://googology.wikia.org/wiki/User_blog:Kanrokoti/Kuma_Worm_Sequence */
/* The code is licensed by CC-BY-SA 3.0.
 lisence terms     : https://creativecommons.org/licenses/by-sa/3.0/legalcode
 Japanese summaries: https://creativecommons.org/licenses/by-sa/3.0/deed.ja
*/

/* Expantion rule of [1] */
var expand=function(a,t){
  var n=a.length;
  if(n==0){
    return []; /* rule 1. */
  }else if(a[n-1]==0){
    return a.slice(0,n-1); /* rule 1-1. */
  }else{
    /*rule 1-2-*. ---------------------------*/
    var i0=-1; /* child root */
    for(var i=n-2;i>=0;i--){
      if(a[i]<a[n-1]){
        i0=i;
        break;
      }
    }
    /* finding good part and bad part. ------*/
    var g; /* good part */
    var b; /* bad part */
    if(i<0){/* child root not found */
      /* rule 1-2-2. */
      g=[a[0]];
      b=a.slice(1);
      b[b.length-1]--;
    }else{/* child root found */
      j0=-1; /* bad root */
      for(var j=i0-1;j>=0;j--){
        if(a[j]==a[i0] && compare(a.slice(j), a.slice(i0))<0){
          j0=j;
          break;
        }
      }
      if(j0<0){ /* j0 not found */
        /* rule 1-2-1-2. */
        g=[a[0]];
        b=a.slice(1);
        b[b.length-1]--;
      }else{ /* j0 found */
        var j1=-1;
        for(var jd=j0+1;jd<=i0;jd++){
          if(a[jd]==a[i0]){
            j1=jd;
            break;
          }
        }
        /* rule 1-2-1-1. */
        g=a.slice(0,j1+1);
        b=a.slice(j1+1,n);
        b[b.length-1]--;
      }
    }
    var e=g;
    for(k=0;k<t;k++){
      e=e.concat(b);
    }
    return e;
  }
}

/* Ordering of [1] */
var compare=function(a,b){
  var len;
  len=a.length;
  len=a.length <= b.length?a.length:b.length;
  for(var i=0;i<len;i++){
    if(a[i]>b[i]) return +1;
    else if(a[i]<b[i]) return -1;
  }
  if(a.length==b.length) return 0;
  else if (a.length>b.length) return +1;
  else return -1;
}

/* FGH of [1] */
var fgh=function(s,m,n){
  if(m==0){
    return n; /* rule 1. */
  }else if(m==1){
    if(s.length==0){
      return n+1; /* rule 2-1. */
    }else{
      if(s[s.length-1]==0){
        return fgh(expand(s,n),n,n); /* rule 2-2-2. */
      }else{
        return fgh(expand(s,n),1,n); /* rule 2-2-2. */
      }
    }
  }else{
    return fgh(s,1,fgh(s,m-1,n)); /* rule 3. */
  }
}
/* FGH of [1] */
var largenumber=function(){
  var n=1;
  for(var i=0;i<100;i++) n*=10;
  return fgh([0,n],n,n);
}


    /* ex.
       0,1,1,0,1,0,1,1--- input sequence
                 *------- child root i0 
                 0,1,1--- cut child
             *----------- less uncle j0
                 *--------bad root j0
                [0,1,0]-- bad part (declemented in 1)
       0,1,1,0,1--------- good part
       0,1,1,0,1[0,1,0][0,1,0][0,1,0] --- output
    */

