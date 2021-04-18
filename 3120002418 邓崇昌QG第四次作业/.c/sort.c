#include "qgsort.h"
void mainmenuface()
{
	printf("--------------------------------------------------\n");
	printf("----------1.������������в�������----------------\n");
	printf("----------2.������������й鲢����----------------\n");
	printf("----------3.������������п�������(�ݹ�)----------\n");
	printf("----------4.������������п�������(�ǵݹ�)--------\n");
	printf("----------5.������������м�������----------------\n");
	printf("----------6.������������л�������----------------\n");
	printf("----------7.���������������ɫ����----------------\n");
	printf("----------8.������������в��ҵ�k���ֵ-----------\n");
	printf("----------9.������������в��ҵ�kС��ֵ-----------\n");
	printf("----------10.���Ը������ڴ��������µ���ʱ---------\n");
	printf("----------11.���Ը��������100*100k�ε���ʱ-------\n");
	printf("--------------------------------------------------\n");
}

int* produce(int *n)
{
	FILE *fp;//�ļ�ָ��
	fp=fopen("data.txt","w");
	if(fp==NULL) //�ж�����ļ�0ָ��Ϊ��
    {
        printf("�ļ����ܴ�! " );
        exit(0);//����0����ʽ�˳�
    }
	int i;
	printf("��������������������������\n");
	while(checkout(n)==0||n<=0)
	{
		printf("�����������������:\n");//������ 
	}
	int *a=(int *)malloc((*n)*sizeof(int));
	srand(time(0));
	for(i=0;i<*n;i++)
	{
	 	a[i]=rand()%1000;
		fprintf(fp,"%d\t",a[i]); 				
 	} 
 	fclose(fp);
 	printf("���ɵ�������ѳɹ��������ļ��У�\n");
 	printf("�������ֵ����Ϊ��\n");
 	for(i=0;i<*n;i++)
	{
		printf("%d ",a[i]); 
						
 	} 
 	printf("\n");
 	
 	return a;
}

int checkout(int *val)
{
	int i=0;
	char a[100]={0};
	scanf("%s",a);
	for(i=0;a[i]!='\0';i++)	//�����������Ƿ��ַ� 
	{
		if(a[i]<'0'||a[i]>'9')
		{
			return 0;
		}
	}
	*val=atoi(a);
	return *val;
}

void insertSort(int *a,int n)//�������� 
{
	int i,j,k;
	for(i=1;i<n;i++)
	{
		k=a[i];	//��Ҫ�����ֵ����� 
		j=i-1;	//�����ֵ��ǰ��ʼ�Ƚ� 
		while(j>=0&&a[j]>k)
		{
			a[j+1]=a[j]; 
			j--;	//�������ֵ���Ԫ�������ƶ�һλ 
		}
		a[j+1]=k;	//ʹҪ�������ֵ���뵽������ 
	} 
} 

void print(int *a,int n)
{
	int i=0;
	printf("����õ�����ֵ����Ϊ��\n");
	for(i=0;i<n;i++)
	{
		printf("%d ",a[i]);
	}
	printf("\n");
}

void QuickSort_Recursion(int *a, int begin, int end)	//�������򣨵ݹ�棩 
{
 	    int pivot;
 	    if(begin<end)
 	    {
 	    pivot=Partition(a,begin,end);				 
		QuickSort_Recursion(a,begin,pivot-1);//�ԱȻ�׼ֵС������ݹ����� 
		QuickSort_Recursion(a,pivot+1,end);//�ԱȻ�׼ֵ�������ݹ����� 
		}	   		
}

void QuickSort(int* a,int size)//�������򣬷ǵݹ�棨ʹ��ջ�� 
{      
    int begin=0;
    int end=size-1;
    int* stack=(int*)malloc((end+1)*sizeof(int));//����һ���ڴ���ջ��ʹ�ã�������ʱ���
    if(stack==NULL)
    {
	   return ;	//��ʾ�ڴ����ʧ�� 
	}
    int begin_temp=begin;//�洢begin��end��������ջ��topֵ 
    int end_temp=end;
    int stack_top=0;
	int p=Partition(a,begin_temp,end_temp); //��ȡ��׼ֵ����Ӧ���±� 
    if(p>(begin_temp+1))//���в�ֹһ���Ȼ�׼ֵС��������Ϊֻ��һ���Ͳ����������� 
    {
        stack[stack_top]=p-1; //�ѻ�׼ֵ�󲿷ֵ��ұ߽����ջ�� 
        stack_top++;
        stack[stack_top]=begin_temp;//�ѻ�׼ֵ�󲿷ֵ���߽����ջ�� 
        stack_top++;
    }
    if(p<(end_temp-1))//���в�ֹһ���Ȼ�׼ֵ���������Ϊֻ��һ���Ͳ����������� 
    {
        stack[stack_top]=end_temp;//�ѻ�׼ֵ�Ҳ��ֵ��ұ߽����ջ�� 
        stack_top++; 
        stack[stack_top]=p+1;//�ѻ�׼ֵ�Ҳ��ֵ���߽����ջ�� 
        stack_top++; 
    }
    while (stack_top>0)//���ջ��topֵΪ0,��˵������if��δִ��
    {
    	stack_top--; 
        begin_temp=stack[stack_top];//��ջ�л�ȡ��ʼ��ַ
        stack_top--;
        end_temp=stack[stack_top];//��ջ�л�ȡĩ�˵�ַ
        p=Partition(a,begin_temp,end_temp);
        if(p>(begin_temp+1))//����߻���Ҫ���� 
        {
            stack[stack_top]=p-1;//����ջ�ĺ���ȳ�ԭ���Ա��ڵȵ���ȡ��߽� 
            stack_top++;
            stack[stack_top]=begin_temp;//�Ա��ڵȵ���ȡ�ұ߽� 
            stack_top++;
        }
        if(p<(end_temp-1))//���ұ߻���Ҫ���� 
        {
            stack[stack_top]=end_temp;//ͬ�� 
            stack_top++;
            stack[stack_top]=p+1;
            stack_top++;
        }
    }    	//����ѭ��ʱ��Ҳ����ÿ�����ֶ�������ɵ�ʱ��
    free(stack);//	����ջ 
    stack=NULL;
}

int Partition(int *a, int begin, int end)//ʹ�����Ὣ���黮�ֳ�������,�����������λ�� 
{
	if(begin<end)//�ж��費��Ҫ�������begin=end˵��ֻ��һ�����ݣ�����Ҫ���� 
	{
		int i,j;
		i=begin+1;//��i�ӵ�һ�����ݵ���һ����ʼ 
		j=end;
		while(i<j)
		{
			if(a[i]>a[begin])
			{
				swap(&a[i],&a[j]);//���i�±��Ӧ������ֵ��begin��Ӧ�Ĵ�����j��Ӧ�����齻�� 
				j--;
			}
			else
			{
				i++;
			}
		}
		if(a[i]>a[begin])	//�ñ�beginС��ֵ���׼ֵ����λ�ã��û�׼ֵ���м�ȥ 
		{
			i--;
		}
		swap(&a[begin],&a[i]);//����Ŧֵ�����ں��ʵ�λ��
		return i; 
	}
} 

void MergeArray(int *a,int begin,int mid,int end,int *temp)
{
	int i=begin,j=mid+1,k=0;	
	while(i<=mid&&j<=end) 
	{
		if (a[i]<a[j])//�Ƚ�������������ߵ�Ԫ�ش�С 
		{
			temp[k]=a[i];//��С��Ԫ��ֵ�����ݴ������ 
			k++;
			i++;
        }
		else
		{
			temp[k]=a[j];//��С��Ԫ��ֵ�����ݴ������ 
			k++;
			j++;
        }
	}
	if (i==mid+1)//��i�Ѿ��������������֮�� 
	 {
		while(j<=end) //j��û�б����� 
		{
			temp[k]=a[j];//�Ͱ�ʣ�µ�ֵ���մ�С�����ݴ����� 
			k++;
			j++;
		}		
	}
	if (j==end+1) //��j�Ѿ��������������֮�� 
	{
		while(i<=mid)//i��û�б�����
		{
			temp[k]=a[i];//�Ͱ�ʣ�µ�ֵ���մ�С�����ݴ�����
			k++;
			i++;
		}
			
	}
	for (j=0,i=begin;j<k;i++,j++) 
	{
		a[i]=temp[j];//���ݴ������ֵ����a 
	}
}
 
void MergeSort(int *a,int begin,int end,int * temp) 
{
	if (begin>=end)
	return;
	int mid=(begin+end)/2;//��mid��Ǻ��м���±� 
	MergeSort(a,begin,mid,temp);//������ݹ�ֳɸ�С�Ĳ��� 
	MergeSort(a,mid+1,end,temp);
	MergeArray(a,begin,mid,end,temp);//������ϲ������� 
}

void CountSort(int *a,int size,int max)//�������� 
{
	int *count_a=(int *)malloc(max*sizeof(int));//�������������������0��100�ڵ����֣�����ֻ�����100���ռ�
	int *sorted_a =(int *)malloc(size*sizeof(int));// ������õ��������ռ� 
	if(count_a==NULL||sorted_a==NULL)//�ж����޳ɹ����䵽�ڴ�ռ� 
	{
		return ;
	} 
	int i=0,j=0;
	for(i=0;i<max;i++)
	{
		count_a[i]=0;//��ʼ������ 
	}
	for(i=0;i<size;i++)
	{
		count_a[a[i]]++;//����ÿ��ֵ��Ԫ�ظ��� 
	}
	for(i=1;i<max;i++)
	{
		count_a[i]=count_a[i]+count_a[i-1];//����С�ڵ���ÿ��Ԫ�صĸ��� 
	}
	for(i=size;i>0;i--)
	{
		count_a[a[i-1]]--;
		sorted_a[count_a[a[i-1]]]=a[i-1];//������Ԫ�ذ��ռ�����䵽��Ӧλ�ã�����ǰ�轫���϶�Ӧ��ֵ��1��������У� 
	}
	for(i=0;i<size;i++)
	{
		a[i]=sorted_a[i];//�����к����鸳ֵ��a���� 
	}
	free(count_a);//�ͷ��ڴ�ռ� 
	count_a=NULL;
}

void Count_Sort(int *a,int n,int exp)//���������еļ������� 
{
	int temp[n];//��ʱ�洢a�����е�Ԫ��
	int buckets[10]={0};//����װ0��9��Ͱ 
	int i=0;
	for(i=0;i<n;i++)
	{
		buckets[(a[i]/exp)%10]++;//��¼��ÿ�����ֳ��ֵĴ��� 
	} 
	for(i=0;i<10;i++)
	{
		buckets[i]=buckets[i-1]+buckets[i];//��¼���ж��ٸ�����С�ڵ��ڸ����� 
	}
	for(i=n-1;i>=0;i--)
	{
		buckets[(a[i]/exp)%10]--;
		temp[buckets[(a[i]/exp)%10]]=a[i];//��ԭ������a��ֵ�����źõ�˳�򸳸�temp���� 
	}
	for(i=0;i<n;i++)
	{
		a[i]=temp[i];//���ݴ������е�ֵ�ٷ�����a	
	}
	
} 

void RadixCountSort(int *a,int size)//�������� 
{
	int exp;//ָ����Ҫ�Ÿ�λ��ʱ����1����ʮλ��ʱ����10......
	int max=a[0],i;
 	for(i=0;i<size;i++)
 	{
 		if(max<a[i])//Ѱ������a�е����ֵ���Ա�ȷ��exp�����ֵ 
 		{
 			max=a[i];
		}
	}
	for(exp=1;max/exp>0;exp=exp*10)
	{
		Count_Sort(a,size,exp);//���뵽�йػ�������ļ��������� 
	}
}

void ColorSort(int *a,int size)
{
 	 int i=0,j=0,k=0;
 	 for(i=0;i<size;i++)
 	 {
 	 	if(a[i]==1)
 	 	{
 	 		j++;//��¼1���ֵĴ��� 
		}
		else if(a[i]==2)
		{
			k++;//��¼2���ֵĴ���
		}
	 }
	 for(i=0;i<size-j-k;i++)
	 {
	 	a[i]=0;//��0����ֵ����a 
	 }
	 for(i=size-j-k;i<size-k;i++)
	 {
	 	a[i]=1;//��0����ֵ����a 
	 }
	 for(i=size-k;i<size;i++)
	 {
	 	a[i]=2;//��0����ֵ����a 
	 }
}

void GetReasult(int *a,int begin,int end,int k)//����������ڼ���/Сֵ 
{
    if(begin==end)
	{
		return ;
	} 
    else
	{
        int num;
        if (begin<end)
        {
        	num=Partition(a,begin,end);//�һ�׼ֵ 
		}   
        if (num==k-1) 
		{
			return;
		}
        else if(num>=k)
		{
            GetReasult(a,begin,num-1,k);
        } 
		else {
            GetReasult(a,num+1,end,k);
        }
    }
}

void swap(int *a,int *b)//�����������ݵĺ��� 
{
	int temp;
	temp=*a;
	*a=*b;
	*b=temp;
}

void mainmenuface2()
{
	printf("����������ڴ�������(10000��50000��200000)\n");
	printf("--------------1.��������------------------\n");
	printf("--------------2.�鲢����------------------\n");
	printf("--------------3.��������(�ݹ�)------------\n");
	printf("--------------4.��������(�ǵݹ�)----------\n");
	printf("--------------5.��������------------------\n");
	printf("--------------6.��������------------------\n");
	printf("--------------7.��ɫ����------------------\n");
	printf("--------------8.�������˵�----------------\n");
	printf("------------------------------------------\n");
}

int* produce100()
{
	int i;	
	int n=100;
	int *a=(int *)malloc(n*sizeof(int));
	srand(time(0));
	for(i=0;i<n;i++)
	{
	 	a[i]=rand()%1000;				
 	} 
 	return a;
}


int* produce10k()
{
	int i;	
	int n=10000;
	int *a=(int *)malloc(n*sizeof(int));
	srand(time(0));
	for(i=0;i<n;i++)
	{
	 	a[i]=rand()%1000;				
 	} 
 	return a;
}

int* produce50k()
{
	int i;	
	int n=50000;
	int *a=(int *)malloc(n*sizeof(int));
	srand(time(0));
	for(i=0;i<n;i++)
	{
	 	a[i]=rand()%1000;				
 	} 
 	return a;
}

int* produce200k()
{
	int i;	
	int n=200000;
	int *a=(int *)malloc(n*sizeof(int));
	srand(time(0));
	for(i=0;i<n;i++)
	{
	 	a[i]=rand()%1000;				
 	} 
 	return a;
}

int* file_r_w(int n)
{
	int i=0;
	FILE *fp=fopen("data.txt","r");
	if(fp==NULL)
	{
		printf("�ļ���ȡʧ�ܣ�\n");
		return ;
	}
 	produce(&n); 
 	int *a=(int *)malloc(n*sizeof(int));
 	for(i=0;i<n;i++)
 	{
	    fscanf(fp,"%d",&a[i]);
	}
	fclose(fp);
	printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
	return a;
} 

