// 루프를 도는 두가지 방법...
// i를 증가시켜서 R1보다 작게 할 것이냐...
// R1을 감소시켜서 0보다 작으면 점프... 나는 요거..

M[R2] = 0

(LOOP)
// end of loop condition
@R1
MD=M-1
@END
D;JLT

@R0
D=M

@R2 // R2에 저장...
M=D+M

@LOOP
0;JMP

(END)

@END
0;JMP