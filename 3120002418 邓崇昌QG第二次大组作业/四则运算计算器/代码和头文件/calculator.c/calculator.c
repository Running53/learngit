#include "calculator.h"

void mainmenuface()
{
 	printf("--------------------------------------------\n");
	printf("-------------  1.����Ҫ�����ʽ�� 	 -------\n");
	printf("-------------  2.�˳�����			 -------\n");
	printf("--------------------------------------------\n");
}

int checkout1(int *val)
{
	char a[100]={0};
	int i=0,flags=0;
	scanf("%s",a);		//���û����� 
	for(i=0;a[i]!='\0';i++)
	{
		if(a[i]<'0'||a[i]>'9')		//���μ���û������ÿһ���ַ��Ƿ���ȷ 
		{
			flags=1;
		} 
	}
	if(flags==1)
	{
		return 1;	//˵���û������벢�Ǵ����� 
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
 			return 1;		//�û�����ı��ʽ��һ������Ϊ�����ַ� 
		}
		if((a[i]<'0'||a[i]>'9')&&a[i]!='.')		//����û���������ַ� (������С���㣩 
		{
			flag=1;					//��¼���û������������ַ� 
		}
		if((a[i]<'0'||a[i]>'9')&&(a[i]!='+'&&a[i]!='-'&&a[i]!='*'&&a[i]!='/'&&a[i]!='('&&a[i]!=')'&&a[i]!='.'))
		{
			return 1;				//˵���û�û��������ȷ���ַ� 
		}
		if(a[i]=='/'&&a[i+1]=='0')
		{
			return 1;			//��ĸ����Ϊ0 
		}
		if(a[i]=='('||a[i]==')')
		{
			cnt++;					//��ֹ�û�ֻ����һ������ 
		}	
		if(((a[i]<'0'||a[i]>'9')&&(a[i+1]<'0'||a[i+1]>'9')&&a[i+1]!='(')&&((a[i+1]<'0'||a[i+1]>'9')&&a[i]!=')')&&(a[i]<'0'||a[i]>'9'))
		{
			return 1;				//˵���û������������������������ 
		}	
	}
	 	if(flag==0)
		 {
     	    return 1;			//˵���û�û�������ַ��������ȫ�������ֻ���С���� 
	     } 
	     else if(cnt%2==1)
	     {
	     	return 1;			//˵���û����������Ϊ������ 
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
	d[cnt]=b[0];			//�ڵ�һ����ǰ��ӿո� 
	cnt++;
	for(i=1;b[i]!='\0';i++)
	{
		if((b[i]=='+'||b[i]=='-'||b[i]=='*'||b[i]=='/')&&b[i]!='.')//˵���ַ��Ƿ����Ҳ���С���� 
		{
			d[cnt]=' ';
			cnt++;
			d[cnt]=b[i];		//�������ǰ���һ���ո� 
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
			cnt++;			//˵�����������֡�С������������� 
		}
		else if((b[i]>='0'&&b[i]<='9')&&(b[i-1]<'0'||b[i-1]>'9'))
		{
			d[cnt]=' ';
			cnt++;
			d[cnt]=b[i];
			cnt++;
		}
	}			//�Ѿ��õ����ÿո�ָ����׺���ʽ 
	d[cnt]=' ';
}

void changesuffix(char d[],expression1 *mid,char c[])	//��׺���ʽת��Ϊ��׺���ʽ 
{
 	 int i=0,cnt=0;
 	 for(i=0;d[i]!='\0';i++)
 	 {
 	 	if(d[i]==' '||(d[i]>='0'&&d[i]<='9')||d[i]=='.')
 	 	{
 	 		c[cnt]=d[i];		//�����ո����֡�С����ֱ�ӷŵ�c�����м��� 
 	 		cnt++;
		}
		else if(mid->top==-1||d[i]=='(')
		{							//���ջΪ�ջ����������ţ������ֱ�ӽ�ջ 
			mid->top++;
			mid->data[mid->top]=d[i];
		}
		else if(d[i]==')')
		{
			while(mid->data[mid->top]!='(')
			{	
				c[cnt]=mid->data[mid->top];	//������������ţ���Ҫջ�ڷ������γ�ջֱ�������� 
				cnt++;
				c[cnt]=' ';
				cnt++;
				mid->top--; 
			}
			mid->top--;		//�������ų�ջ 
		}
		else if(d[i]=='+'||d[i]=='-')
		{
			while(mid->top!=-1&&mid->data[mid->top]!='(')
			{						//�������Ϊ+��-����ջ�еķ��ž�Ҫȫ����ջ��Ȼ�����������ջ 
				c[cnt]=mid->data[mid->top];			
				cnt++;
				c[cnt]=' ';
				cnt++;
				mid->top--;
			
			}
			mid->top++;
			mid->data[mid->top]=d[i];//Ȼ�����������ջ 
		}
		else if(d[i]=='*'||d[i]=='/')
		{
			if(mid->data[mid->top]=='*'||mid->data[mid->top]=='/')
			{
			c[cnt]=mid->data[mid->top];//�������Ϊ*��/���Ǿ�Ҫջ����Ԫ�س�ջ
	        cnt++;
	        c[cnt]=' ';
	        cnt++;
	        mid->data[mid->top]=d[i];	//Ȼ�����������ջ
			}
			else
			{
				mid->top++;
				mid->data[mid->top]=d[i];
			}   
		}
	 }
	 //˵��forѭ����������ջ�е�Ԫ�����γ�ջ
	 while(mid->top!=-1)
	 {
	 	c[cnt]=mid->data[mid->top];			
		cnt++;
		c[cnt]=' ';
		cnt++;
		mid->top--;
	 } 		//��ջ���֮��˵���Ѿ�����׺���ʽת��Ϊ�˺�׺���ʽ 
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
