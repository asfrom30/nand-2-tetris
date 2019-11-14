// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
// @R0
// D=M
// @R1

// 루프를 도는 두가지 방법...
// i를 증가시켜서 R1보다 작게 할 것이냐...
// R1을 감소시켜서 0보다 작으면 점프... 나는 요거..

(LOOP)
@R1
D=M

D=D-1

(END)
@END
0;JMP

// for(var i=0; i < 100; i++)
// @i
// M=1
// @sum
// M=0

// (LOOP)
// @i
// D=M
// @100
// D=D-A
// @END
// D;JGT
// @i
// D=M
// @sum
// M=D+M
// @i
// M=M+1
// @LOOP
// 0;JMP
// (END)
// @END
// 0;JMP