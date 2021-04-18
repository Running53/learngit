#include "qgsort.h"
void mainmenuface()
{
	printf("--------------------------------------------------\n");
	printf("----------1.生成随机数进行插入排序----------------\n");
	printf("----------2.生成随机数进行归并排序----------------\n");
	printf("----------3.生成随机数进行快速排序(递归)----------\n");
	printf("----------4.生成随机数进行快速排序(非递归)--------\n");
	printf("----------5.生成随机数进行计数排序----------------\n");
	printf("----------6.生成随机数进行基数排序----------------\n");
	printf("----------7.生成随机数进行颜色排序----------------\n");
	printf("----------8.生成随机数进行查找第k大的值-----------\n");
	printf("----------9.生成随机数进行查找第k小的值-----------\n");
	printf("----------10.测试各排序在大数据量下的用时---------\n");
	printf("----------11.测试各排序进行100*100k次的用时-------\n");
	printf("--------------------------------------------------\n");
}

int* produce(int *n)
{
	FILE *fp;//文件指针
	fp=fopen("data.txt","w");
	if(fp==NULL) //判断如果文件0指针为空
    {
        printf("文件不能打开! " );
        exit(0);//在以0的形式退出
    }
	int i;
	printf("请输入您想产生的随机数个数：\n");
	while(checkout(n)==0||n<=0)
	{
		printf("输入错误！请重新输入:\n");//输入检测 
	}
	int *a=(int *)malloc((*n)*sizeof(int));
	srand(time(0));
	for(i=0;i<*n;i++)
	{
	 	a[i]=rand()%1000;
		fprintf(fp,"%d\t",a[i]); 				
 	} 
 	fclose(fp);
 	printf("生成的随机数已成功保存至文件中！\n");
 	printf("随机数的值依次为：\n");
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
	for(i=0;a[i]!='\0';i++)	//检查有无输入非法字符 
	{
		if(a[i]<'0'||a[i]>'9')
		{
			return 0;
		}
	}
	*val=atoi(a);
	return *val;
}

void insertSort(int *a,int n)//插入排序 
{
	int i,j,k;
	for(i=1;i<n;i++)
	{
		k=a[i];	//把要插入的值拎出来 
		j=i-1;	//从这个值往前开始比较 
		while(j>=0&&a[j]>k)
		{
			a[j+1]=a[j]; 
			j--;	//让这个数值大的元素往后移动一位 
		}
		a[j+1]=k;	//使要插入的数值插入到数组中 
	} 
} 

void print(int *a,int n)
{
	int i=0;
	printf("排序好的数组值依次为：\n");
	for(i=0;i<n;i++)
	{
		printf("%d ",a[i]);
	}
	printf("\n");
}

void QuickSort_Recursion(int *a, int begin, int end)	//快速排序（递归版） 
{
 	    int pivot;
 	    if(begin<end)
 	    {
 	    pivot=Partition(a,begin,end);				 
		QuickSort_Recursion(a,begin,pivot-1);//对比基准值小的数组递归排序 
		QuickSort_Recursion(a,pivot+1,end);//对比基准值大的数组递归排序 
		}	   		
}

void QuickSort(int* a,int size)//快速排序，非递归版（使用栈） 
{      
    int begin=0;
    int end=size-1;
    int* stack=(int*)malloc((end+1)*sizeof(int));//申请一块内存做栈来使用，用来临时存放
    if(stack==NULL)
    {
	   return ;	//表示内存分配失败 
	}
    int begin_temp=begin;//存储begin与end并且设置栈顶top值 
    int end_temp=end;
    int stack_top=0;
	int p=Partition(a,begin_temp,end_temp); //获取基准值所对应的下标 
    if(p>(begin_temp+1))//即有不止一个比基准值小的数，因为只有一个就不用再排序了 
    {
        stack[stack_top]=p-1; //把基准值左部分的右边界放入栈中 
        stack_top++;
        stack[stack_top]=begin_temp;//把基准值左部分的左边界放入栈中 
        stack_top++;
    }
    if(p<(end_temp-1))//即有不止一个比基准值大的数，因为只有一个就不用再排序了 
    {
        stack[stack_top]=end_temp;//把基准值右部分的右边界放入栈中 
        stack_top++; 
        stack[stack_top]=p+1;//把基准值右部分的左边界放入栈中 
        stack_top++; 
    }
    while (stack_top>0)//如果栈顶top值为0,那说明两个if都未执行
    {
    	stack_top--; 
        begin_temp=stack[stack_top];//从栈中获取起始地址
        stack_top--;
        end_temp=stack[stack_top];//从栈中获取末端地址
        p=Partition(a,begin_temp,end_temp);
        if(p>(begin_temp+1))//即左边还需要排序 
        {
            stack[stack_top]=p-1;//根据栈的后进先出原则，以便于等等先取左边界 
            stack_top++;
            stack[stack_top]=begin_temp;//以便于等等先取右边界 
            stack_top++;
        }
        if(p<(end_temp-1))//即右边还需要排序 
        {
            stack[stack_top]=end_temp;//同上 
            stack_top++;
            stack[stack_top]=p+1;
            stack_top++;
        }
    }    	//结束循环时，也就是每个部分都排序完成的时候
    free(stack);//	销毁栈 
    stack=NULL;
}

int Partition(int *a, int begin, int end)//使用枢轴将数组划分成两部分,并返回枢轴的位置 
{
	if(begin<end)//判断需不需要排序，如果begin=end说明只有一个数据，不需要排序 
	{
		int i,j;
		i=begin+1;//让i从第一个数据的下一个开始 
		j=end;
		while(i<j)
		{
			if(a[i]>a[begin])
			{
				swap(&a[i],&a[j]);//如果i下标对应的数组值比begin对应的大，则与j对应的数组交换 
				j--;
			}
			else
			{
				i++;
			}
		}
		if(a[i]>a[begin])	//让比begin小的值与基准值交换位置，让基准值到中间去 
		{
			i--;
		}
		swap(&a[begin],&a[i]);//将枢纽值放置在合适的位置
		return i; 
	}
} 

void MergeArray(int *a,int begin,int mid,int end,int *temp)
{
	int i=begin,j=mid+1,k=0;	
	while(i<=mid&&j<=end) 
	{
		if (a[i]<a[j])//比较两个数组最左边的元素大小 
		{
			temp[k]=a[i];//把小的元素值赋给暂存的数组 
			k++;
			i++;
        }
		else
		{
			temp[k]=a[j];//把小的元素值赋给暂存的数组 
			k++;
			j++;
        }
	}
	if (i==mid+1)//当i已经遍历完左边数组之后 
	 {
		while(j<=end) //j还没有遍历完 
		{
			temp[k]=a[j];//就把剩下的值按照大小赋给暂存数组 
			k++;
			j++;
		}		
	}
	if (j==end+1) //当j已经遍历完左边数组之后 
	{
		while(i<=mid)//i还没有遍历完
		{
			temp[k]=a[i];//就把剩下的值按照大小赋给暂存数组
			k++;
			i++;
		}
			
	}
	for (j=0,i=begin;j<k;i++,j++) 
	{
		a[i]=temp[j];//把暂存数组的值赋给a 
	}
}
 
void MergeSort(int *a,int begin,int end,int * temp) 
{
	if (begin>=end)
	return;
	int mid=(begin+end)/2;//用mid标记好中间的下标 
	MergeSort(a,begin,mid,temp);//将数组递归分成更小的部分 
	MergeSort(a,mid+1,end,temp);
	MergeArray(a,begin,mid,end,temp);//将数组合并且排序 
}

void CountSort(int *a,int size,int max)//计数排序 
{
	int *count_a=(int *)malloc(max*sizeof(int));//由于限制了随机数生成0到100内的数字，所以只需分配100个空间
	int *sorted_a =(int *)malloc(size*sizeof(int));// 给排序好的数组分配空间 
	if(count_a==NULL||sorted_a==NULL)//判断有无成功分配到内存空间 
	{
		return ;
	} 
	int i=0,j=0;
	for(i=0;i<max;i++)
	{
		count_a[i]=0;//初始化数组 
	}
	for(i=0;i<size;i++)
	{
		count_a[a[i]]++;//计算每个值的元素个数 
	}
	for(i=1;i<max;i++)
	{
		count_a[i]=count_a[i]+count_a[i-1];//计算小于等于每个元素的个数 
	}
	for(i=size;i>0;i--)
	{
		count_a[a[i-1]]--;
		sorted_a[count_a[a[i-1]]]=a[i-1];//将所有元素按收集表分配到对应位置，分配前需将表上对应的值减1（倒序进行） 
	}
	for(i=0;i<size;i++)
	{
		a[i]=sorted_a[i];//将排列好数组赋值给a数组 
	}
	free(count_a);//释放内存空间 
	count_a=NULL;
}

void Count_Sort(int *a,int n,int exp)//基数排序中的计数排序 
{
	int temp[n];//临时存储a数组中的元素
	int buckets[10]={0};//用来装0到9的桶 
	int i=0;
	for(i=0;i<n;i++)
	{
		buckets[(a[i]/exp)%10]++;//记录下每个数字出现的次数 
	} 
	for(i=0;i<10;i++)
	{
		buckets[i]=buckets[i-1]+buckets[i];//记录下有多少个数字小于等于该数字 
	}
	for(i=n-1;i>=0;i--)
	{
		buckets[(a[i]/exp)%10]--;
		temp[buckets[(a[i]/exp)%10]]=a[i];//将原本数组a的值按照排好的顺序赋给temp数组 
	}
	for(i=0;i<n;i++)
	{
		a[i]=temp[i];//将暂存数组中的值再返赋给a	
	}
	
} 

void RadixCountSort(int *a,int size)//基数排序 
{
	int exp;//指数，要排个位数时就是1；排十位数时就是10......
	int max=a[0],i;
 	for(i=0;i<size;i++)
 	{
 		if(max<a[i])//寻找数组a中的最大值，以便确定exp的最大值 
 		{
 			max=a[i];
		}
	}
	for(exp=1;max/exp>0;exp=exp*10)
	{
		Count_Sort(a,size,exp);//进入到有关基数排序的计数排序函数 
	}
}

void ColorSort(int *a,int size)
{
 	 int i=0,j=0,k=0;
 	 for(i=0;i<size;i++)
 	 {
 	 	if(a[i]==1)
 	 	{
 	 		j++;//记录1出现的次数 
		}
		else if(a[i]==2)
		{
			k++;//记录2出现的次数
		}
	 }
	 for(i=0;i<size-j-k;i++)
	 {
	 	a[i]=0;//将0的数值赋给a 
	 }
	 for(i=size-j-k;i<size-k;i++)
	 {
	 	a[i]=1;//将0的数值赋给a 
	 }
	 for(i=size-k;i<size;i++)
	 {
	 	a[i]=2;//将0的数值赋给a 
	 }
}

void GetReasult(int *a,int begin,int end,int k)//找无序数组第几大/小值 
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
        	num=Partition(a,begin,end);//找基准值 
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

void swap(int *a,int *b)//交换数组数据的函数 
{
	int temp;
	temp=*a;
	*a=*b;
	*b=temp;
}

void mainmenuface2()
{
	printf("以下排序均在大数据下(10000，50000，200000)\n");
	printf("--------------1.插入排序------------------\n");
	printf("--------------2.归并排序------------------\n");
	printf("--------------3.快速排序(递归)------------\n");
	printf("--------------4.快速排序(非递归)----------\n");
	printf("--------------5.计数排序------------------\n");
	printf("--------------6.基数排序------------------\n");
	printf("--------------7.颜色排序------------------\n");
	printf("--------------8.返回主菜单----------------\n");
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
		printf("文件读取失败！\n");
		return ;
	}
 	produce(&n); 
 	int *a=(int *)malloc(n*sizeof(int));
 	for(i=0;i<n;i++)
 	{
	    fscanf(fp,"%d",&a[i]);
	}
	fclose(fp);
	printf("文件中的数据已成功读入到数组中并准备排序！\n");
	return a;
} 

