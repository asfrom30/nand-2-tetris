

# split out

```hdl
Mux4Way16(out[0..15]=a[0..15], out[15]=b ,out[15]=c, out=d);
```

# split in
```hdl
Add16(a=in,b[0]=true,b[1..15]=false,out=out);
```