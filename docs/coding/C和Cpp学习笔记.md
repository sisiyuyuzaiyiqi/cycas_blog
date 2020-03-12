---
title: C和Cpp学习笔记
date: 2018-9-9 8:56
tags: [C和Cpp]
---

<CreateTime/>
<TagLinks />

本文用于 C 和 C++学习过程中零星知识点的收集。

## 头文件大全

### C、传统 C++

```cpp
#include <assert.h>　　　　//设定插入点
#include <ctype.h>　　　　 //字符处理
#include <errno.h>　　　　 //定义错误码
#include <float.h>　　　　 //浮点数处理
#include <fstream.h>　　　//文件输入／输出
#include <iomanip.h>　　　//参数化输入／输出
#include <iostream.h>　　　//数据流输入／输出
#include <limits.h>　　　　//定义各种数据类型最值常量
#include <locale.h>　　　　//定义本地化函数
#include <math.h>　　　　　//定义数学函数
#include <stdio.h>　　　　//定义输入／输出函数
#include <stdlib.h>　　　　//定义杂项函数及内存分配函数
#include <string.h>　　　　//字符串处理
#include <strstrea.h>　　　//基于数组的输入／输出
#include <time.h>　　　　　//定义关于时间的函数
#include <wchar.h>　　　　//宽字符处理及输入／输出
#include <wctype.h>　　　　//宽字符分类
```

### 标准 c++

```cpp
#include <algorithm>　　　 //STL通用算法
#include <bitset>　　　　　//STL位集容器
#include <cctype>
#include <cerrno>
#include <clocale>
#include <cmath>
#include <complex>　　　　 //复数类
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <deque>　　　　　 //STL双端队列容器
#include <exception>　　　 //异常处理类
#include <fstream>
#include <functional>　　　//STL定义运算函数（代替运算符）
#include <limits>
#include <list>　　　　　　//STL线性列表容器
#include <map>　　　　　　 //STL 映射容器
#include <iomanip>
#include <ios>　　　　　　//基本输入／输出支持
#include <iosfwd>　　　　　//输入／输出系统使用的前置声明
#include <iostream>     //数据流输入／输出
#include <istream>　　　　 //基本输入流
#include <ostream>　　　　 //基本输出流
#include <queue>　　　　　 //STL队列容器
#include <set>　　　　　　 //STL 集合容器
#include <sstream>　　　　//基于字符串的流
#include <stack>　　　　　 //STL堆栈容器　　　　
#include <stdexcept>　　　 //标准异常类
#include <streambuf>　　　//底层输入／输出支持
#include <string>　　　　　//字符串类
#include <utility>　　　　 //STL通用模板类
#include <vector>　　　　　//STL动态数组容器
#include <cwchar>
#include <cwctype>

using namespace std;
```

### c99 新增

```c
#include <complex.h>　　//复数处理
#include <fenv.h>　　　　//浮点环境
#include <inttypes.h>　　//整数格式转换
#include <stdbool.h>　　 //布尔环境
#include <stdint.h>　　　//整型环境
#include <tgmath.h>　　　//通用类型数学宏
```

## include "" 与<>的区别

`#include<>`直接从编译器自带的函数库中寻找文件。

`#include""`是先从自定义的文件中找 ，如果找不到在从函数库中寻找文件。

如果是自己写的头文件 建议使用`#include""`。

## EOF 的输入

EOF 是一个计算机术语，为 End Of File 的缩写。

在 C 语言运行过程中，有时需要在终端手动输入 EOF，其输入方法与操作系统有关。

windows: CTRL+Z

Linux/Unix/Mac: CTRL+D

## C++ 中头文件<bits/stdc++.h>

它是部分 C++中支持的一个几乎万能的头文件，包含所有的可用到的 C++库函数，如`<istream>/<ostream>/<stack>/<queue>`

缺点：

- bits/stdc++.h 不是 GNU C++库的标准头文件，所以如果你在一些编译器（除了 GCC）上编译你的代码，可能会失败，比如 MSVC 没有这个头文件。

- 使用它会包含很多不必要的东西，并且会增加编译时间。

- 这个头文件不是 C++标准的一部分，所以是不可移植的，应该尽量避免。

- 尽管标准中有一些通用的头文件，但还是应该避免使用它来代替特定的头文件，因为编译器在每次编译转换单元时都实际地读取并解析每个包含的头文件(包括递归包含的头文件)。

优点：

- 在比赛中,使用这个文件是一个好主意,当你想减少时间浪费在做选择的时候;特别是当你的排名对时间很敏感的时候。

- 减少了编写所有必要头文件的所有杂务。

- 不必为使用的每个函数都记住 GNU c++的所有 STL。
