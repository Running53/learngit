#include "calculator.h"

void mainmenuface()
{
 	printf("--------------------------------------------\n");
	printf("-------------  1.输入要计算的式子 	 -------\n");
	printf("-------------  2.退出程序			 -------\n");
	printf("--------------------------------------------\n");
}

int checkout1(int *val)
{
	char a[100]={0};
	int i=0,flags=0;
	scanf("%s",a);		//让用户输入 
	for(i=0;a[i]!='\0';i++)
	{
		if(a[i]<'0'||a[i]>'9')		//依次检查用户输入的每一个字符是否正确 
		{
			flags=1;
		} 
	}
	if(flags==1)
	{
		return 1;	//说明用户的输入并非纯数字 
	}
	*val=atoi(a); 
	return 0;
} 

int checkout2(char b[])
{
 	char a[100]={0};
 	scanf("%s",a);
 	int i=0,flag=0,cnt=0;
 	for(i=0;a[i]!='\0';i++)
 	{
 		if(a[0]<'0'||a[0]>'9')
 		{
 			return 1;		//用户输入的表达式第一个不能为运算字符 
		}
		if((a[i]<'0'||a[i]>'9')&&a[i]!='.')		//如果用户输入的是字符 (不包含小数点） 
		{
			flag=1;					//记录下用户有输入运算字符 
		}
		if((a[i]<'0'||a[i]>'9')&&(a[i]!='+'&&a[i]!='-'&&a[i]!='*'&&a[i]!='/'&&a[i]!='('&&a[i]!=')'&&a[i]!='.'))
		{
			return 1;				//说明用户没有输入正确的字符 
		}
		if(a[i]=='/'&&a[i+1]=='0')
		{
			return 1;			//分母不可为0 
		}
		if(a[i]=='('||a[i]==')')
		{
			cnt++;					//防止用户只输入一个括号 
		}	
		if(((a[i]<'0'||a[i]>'9')&&(a[i+1]<'0'||a[i+1]>'9')&&a[i+1]!='(')&&((a[i+1]<'0'||a[i+1]>'9')&&a[i]!=')')&&(a[i]<'0'||a[i]>'9'))
		{
			return 1;				//说明用户输入了两个连续的运算符号 
		}	
	}
	 	if(flag==0)
		 {
     	    return 1;			//说明用户没有输入字符，输入的全都是数字或者小数点 
	     } 
	     else if(cnt%2==1)
	     {
	     	return 1;			//说明用户输入的括号为奇数个 
		 }
		 for(i=0;a[i]!='\0';i++)
		 {
		 	b[i]=a[i];
		 }
		 return 0;
}

void devide(char b[],char d[])
{
	int i=1,cnt=0;
	d[cnt]=' ';
	cnt++;
	d[cnt]=b[0];			//在第一个数前面加空格 
	cnt++;
	for(i=1;b[i]!='\0';i++)
	{
		if((b[i]=='+'||b[i]=='-'||b[i]=='*'||b[i]=='/')&&b[i]!='.')//说明字符是符号且不是小数点 
		{
			d[cnt]=' ';
			cnt++;
			d[cnt]=b[i];		//在运算符前面加一个空格 
			cnt++;
		}
		else if(b[i]=='.')
		{
			d[cnt]=b[i];
			cnt++;
		}
		else if(b[i]=='('||b[i]==')')
		{
			d[cnt]=' ';
			cnt++;
			d[cnt]=b[i];
			cnt++;
		}
		else if((b[i]>='0'&&b[i]<='9')&&(b[i-1]>='0'&&b[i-1]<='9'||b[i-1]=='.'))	
		{
			d[cnt]=b[i];
			cnt++;			//说明遇到了数字、小数点相连的情况 
		}
		else if((b[i]>='0'&&b[i]<='9')&&(b[i-1]<'0'||b[i-1]>'9'))
		{
			d[cnt]=' ';
			cnt++;
			d[cnt]=b[i];
			cnt++;
		}
	}			//已经得到了用空格分割的中缀表达式 
	d[cnt]=' ';
}

void changesuffix(char d[],expression1 *mid,char c[])	//中缀表达式转化为后缀表达式 
{
 	 int i=0,cnt=0;
 	 for(i=0;d[i]!='\0';i++)
 	 {
 	 	if(d[i]==' '||(d[i]>='0'&&d[i]<='9')||d[i]=='.')
 	 	{
 	 		c[cnt]=d[i];		//遇到空格、数字、小数点直接放到c数组中即可 
 	 		cnt++;
		}
		else if(mid->top==-1||d[i]=='(')
		{							//如果栈为空或遇到左括号，则符号直接进栈 
			mid->top++;
			mid->data[mid->top]=d[i];
		}
		else if(d[i]==')')
		{
			while(mid->data[mid->top]!='(')
			{	
				c[cnt]=mid->data[mid->top];	//如果遇到右括号，则要栈内符号依次出栈直至左括号 
				cnt++;
				c[cnt]=' ';
				cnt++;
				mid->top--; 
			}
			mid->top--;		//让左括号出栈 
		}
		else if(d[i]=='+'||d[i]=='-')
		{
			while(mid->top!=-1&&mid->data[mid->top]!='(')
			{						//如果符号为+或-，那栈中的符号就要全部出栈，然后这个符号入栈 
				c[cnt]=mid->data[mid->top];			
				cnt++;
				c[cnt]=' ';
				cnt++;
				mid->top--;
			
			}
			mid->top++;
			mid->data[mid->top]=d[i];//然后这个符号入栈 
		}
		else if(d[i]=='*'||d[i]=='/')
		{
			if(mid->data[mid->top]=='*'||mid->data[mid->top]=='/')
			{
			c[cnt]=mid->data[mid->top];//如果符号为*或/，那就要栈顶的元素出栈
	        cnt++;
	        c[cnt]=' ';
	        cnt++;
	        mid->data[mid->top]=d[i];	//然后这个符号入栈
			}
			else
			{
				mid->top++;
				mid->data[mid->top]=d[i];
			}   
		}
	 }
	 //说明for循环结束，让栈中的元素依次出栈
	 while(mid->top!=-1)
	 {
	 	c[cnt]=mid->data[mid->top];			
		cnt++;
		c[cnt]=' ';
		cnt++;
		mid->top--;
	 } 		//出栈完成之后说明已经将中缀表达式转化为了后缀表达式 
} 

double calculate(char c[],expression2 *beh)
{
	int i=0,cnt;
	for(i=0;c[i]!='\0';i++)
	{
		cnt=0;
		char *a;
		char f[20]={0};
		a=f;
		if(c[i]==' ')
		{
			continue;
		}
		if(c[i]>='0'&&c[i]<='9')
		{
			for(;c[i]!=' ';i++)
			{
				f[cnt]=c[i];
				cnt++;
			}	
			beh->top++;
			beh->data[beh->top]=atof(a);
		}
		else if(c[i]=='+')
		{
			beh->data[beh->top-1]=beh->data[beh->top-1]+beh->data[beh->top];
			beh->top--;
		}
		else if(c[i]=='-')
		{
				beh->data[beh->top-1]=beh->data[beh->top-1]-beh->data[beh->top];
				beh->top--;
		}
		else if(c[i]=='*')
		{
				beh->data[beh->top-1]=beh->data[beh->top-1]*beh->data[beh->top];
				beh->top--;
		}
		else if(c[i]=='/')
		{
				beh->data[beh->top-1]=beh->data[beh->top-1]/beh->data[beh->top];
				
				beh->top--;
		}
	}
	return beh->data[beh->top];
}

void clear(char a[])
{
	int i=0;
	for(i=0;a[i]!='\0';i++)
	{
		a[i]='\0';
	}
}
