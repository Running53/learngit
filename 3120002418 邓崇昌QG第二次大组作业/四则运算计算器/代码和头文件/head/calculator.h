#ifndef CALCULATOR_H_INCLUDED
#define CALCULATOR_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>
#define maxsize 100

typedef struct
{
	char data[maxsize];
	int top;
}expression1;


typedef struct
{
	double data[maxsize];
	int top;
}expression2;

void mainmenuface();

int checkout1(int *val);

void clear(char a[]);

int clearstatus1(expression1 *s);

int clearstatus2(expression2 *s);

void devide(char b[],char d[]);

int checkout2(char b[]);

void changesuffix(char d[],expression1 *mid,char c[]);

double calculate(char c[],expression2 *beh);

#endif 

