import{_ as i,o as a,c as l,R as e}from"./chunks/framework.ka86hsJC.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/work/面试题分类/18.操作系统.md","filePath":"articles/work/面试题分类/18.操作系统.md","lastUpdated":1701168128000}'),o={name:"articles/work/面试题分类/18.操作系统.md"},r=e('<p>// 方法二</p><h2 id="操作系统" tabindex="-1">操作系统 <a class="header-anchor" href="#操作系统" aria-label="Permalink to &quot;操作系统&quot;">​</a></h2><h2 id="什么是操作系统" tabindex="-1">什么是操作系统？ <a class="header-anchor" href="#什么是操作系统" aria-label="Permalink to &quot;什么是操作系统？&quot;">​</a></h2><p>操作系统（Operating System，简称 OS）是计算机硬件与用户之间的接口，负责管理和协调计算机硬件资源，为应用程序和用户提供一个友好的运行环境。操作系统具有多种功能，包括进程管理、内存管理、文件系统管理和设备管理等。</p><p>操作系统使得程序员和用户不必关心底层硬件的具体细节，可以更高效地开发和使用计算机。常见的操作系统有 Microsoft Windows、macOS、Linux 等。</p><h2 id="软链接和硬链接的区别是什么" tabindex="-1">软链接和硬链接的区别是什么？ <a class="header-anchor" href="#软链接和硬链接的区别是什么" aria-label="Permalink to &quot;软链接和硬链接的区别是什么？&quot;">​</a></h2><p>软链接（符号链接，Symbolic Link）和硬链接（Hard Link）是两种不同类型的文件链接，通常用于在 Unix 和类 Unix 的文件系统中创建文件或目录的引用。它们之间的主要区别如下：</p><ol><li>存储方式：硬链接是在文件系统中创建一个与原始文件具有相同的 i-node（索引节点）号的新条目。这意味着硬链接与原始文件共享相同的数据块和属性。因此，它们是同一个文件的不同引用。相反，软链接则是一个独立的文件，它的 i-node 不同于原始文件。软链接包含了指向原始文件的路径信息。</li><li>删除操作：当删除原始文件时，硬链接仍然可以访问文件的内容，因为它们共享相同的数据块。然而，当删除原始文件时，软链接将失效，因为它仅包含指向原始文件的路径信息。这时，软链接就成了一个悬空的（或者说失效的）链接。</li><li>跨文件系统：硬链接只能在同一个文件系统中创建，因为它们共享相同的 i-node。而软链接可以跨文件系统创建，因为它们只是指向原始文件的路径，而不是具体的数据块。</li><li>链接类型：硬链接只能针对文件创建，不能针对目录。软链接则可以针对文件和目录创建。</li></ol><p>总之，硬链接是对原始文件内容的直接引用，而软链接是对原始文件路径的引用。硬链接共享与原始文件相同的 i-node 和数据块，而软链接具有独立的 i-node。</p><h2 id="并发和并行有什么区别" tabindex="-1">并发和并行有什么区别？ <a class="header-anchor" href="#并发和并行有什么区别" aria-label="Permalink to &quot;并发和并行有什么区别？&quot;">​</a></h2><p>并发（Concurrency）和并行（Parallelism）是计算机科学中两个相关但不同的概念。它们都涉及到多任务处理，但执行方式和目标有所不同。</p><ol><li>并发（Concurrency）：并发是指多个任务在同一时间段内交替执行，但在某个特定时刻，仅有一个任务在运行。这通常是通过任务之间快速切换来实现的，以便在一个任务等待资源（如 I/O 操作）时执行另一个任务。并发主要出现在单核处理器或者多核处理器但核心数量少于任务数量的情况下。并发的目标是充分利用处理器资源，提高资源的使用效率。</li><li>并行（Parallelism）：并行是指多个任务在同一时刻同时执行。这通常是通过多核处理器或多处理器系统来实现的，每个处理器或核心负责处理一个或多个任务。并行的目标是利用多个处理器或核心加速任务的完成，提高性能。</li></ol><p>总之，区别在于执行方式和目标：并发关注在同一时间段内多任务的交替执行，以提高资源利用率；而并行关注在同一时刻同时执行多个任务，以提高处理速度。在现实场景中，这两个概念可能同时存在，例如在多核处理器系统中执行多个并发任务。</p><h2 id="协程与线程的区别" tabindex="-1">协程与线程的区别 <a class="header-anchor" href="#协程与线程的区别" aria-label="Permalink to &quot;协程与线程的区别&quot;">​</a></h2><p>协程（Coroutine）和线程（Thread）都是用于实现并发执行的概念，但它们之间存在一些关键区别：</p><ol><li>调度方式：线程的调度由操作系统内核管理，通常是抢占式调度。操作系统根据线程优先级和运行时间等因素在不同线程之间进行切换。相比之下，协程的调度是由程序自身控制的，通常采用协作式调度。协程之间的切换由协程自身决定，例如在某个协程遇到 I/O 操作或显式让出执行权时切换到另一个协程。</li><li>并发模型：线程是基于多任务并发执行的，每个线程在单独的执行上下文中运行。协程是基于单任务或多任务的并发执行，可以看作是轻量级的线程。在协程模型中，多个协程在同一个线程内共享执行上下文，通过协作式调度来实现并发。</li><li>资源消耗：线程通常比协程消耗更多的系统资源，因为每个线程都有自己的栈和内核资源。协程由于在用户态运行并共享同一个线程的执行上下文，通常具有更低的内存和系统资源消耗。</li><li>上下文切换开销：线程间的上下文切换涉及到内核态和用户态的切换，通常具有较大的开销。而协程间的上下文切换仅发生在用户态，不需要内核参与，因此开销较小。</li></ol><p>总之，协程和线程都是实现并发执行的方法，但它们在调度方式、并发模型、资源消耗和上下文切换开销等方面存在区别。协程是一种轻量级的并发机制，适用于 I/O 密集型任务和需要大量并发执行的场景。线程则适用于 CPU 密集型任务和多核处理器系统。</p><h2 id="进程与线程的区别" tabindex="-1">进程与线程的区别 <a class="header-anchor" href="#进程与线程的区别" aria-label="Permalink to &quot;进程与线程的区别&quot;">​</a></h2><p>进程（Process）和线程（Thread）是计算机科学中与并发和并行执行相关的两个基本概念。它们之间的主要区别如下：</p><ol><li>定义和独立性：进程是一个独立的运行环境，包含了一个程序在运行过程中所需要的所有资源，如代码、数据、内存空间和系统资源等。每个进程在操作系统中都有独立的内存空间和地址空间。线程是进程内的一个执行单元，可以共享进程的资源。一个进程可以包含多个线程，它们共享进程的内存空间和系统资源，但每个线程都有自己独立的运行栈和局部变量。</li><li>上下文切换开销：线程间的上下文切换通常比进程间的上下文切换要快得多。因为线程共享进程的内存空间，所以在切换时不需要切换整个内存空间，只需要切换线程运行栈和寄存器状态等少量信息。而进程间的上下文切换需要更多的开销，因为它们具有独立的地址空间。</li><li>通信和同步：线程之间的通信和同步通常比进程之间的通信和同步更简单，因为线程共享进程的内存空间，可以直接访问其他线程的数据。进程之间的通信需要通过操作系统提供的进程间通信（IPC）机制，如管道、信号量、共享内存等。</li><li>容错性：由于进程具有独立的地址空间，一个进程的崩溃不太可能影响到其他进程。然而，线程共享进程的内存空间，一个线程的崩溃可能导致整个进程的崩溃，从而影响到进程中的其他线程。</li></ol><p>总之，进程是一个独立的执行环境，拥有独立的内存空间，而线程是进程内的执行单元，共享进程的资源。线程之间的上下文切换和通信开销相对较小，但容错性较差。</p><h2 id="什么是死锁-死锁产生的条件" tabindex="-1">什么是死锁？死锁产生的条件？ <a class="header-anchor" href="#什么是死锁-死锁产生的条件" aria-label="Permalink to &quot;什么是死锁？死锁产生的条件？&quot;">​</a></h2><p>死锁（Deadlock）是指在多任务环境中，一组或多组任务相互等待对方释放资源的一种状态。在这种情况下，任务之间互相阻塞，无法继续执行。死锁可能导致系统性能下降或完全停止工作。</p><p>产生死锁的四个必要条件如下：</p><ol><li>互斥条件（Mutual Exclusion）：资源不能被多个任务同时占用。也就是说，一旦一个任务获得某资源，其他任务必须等待该资源被释放。</li><li>占有并等待条件（Hold and Wait）：任务持有至少一个资源，同时等待其他任务释放的资源。这意味着任务既占有资源，又在等待其他资源。</li><li>非抢占条件（No Preemption）：资源不能被强制从任务中抢占。换句话说，在任务完成之前，它持有的资源不能被其他任务抢占。</li><li>循环等待条件（Circular Wait）：存在一组任务，它们构成了一个循环等待资源的链，即每个任务都在等待下一个任务持有的资源。</li></ol><p>要避免死锁，必须破坏产生死锁的这四个条件中的至少一个。常见的死锁预防和解决方法包括资源分配策略（如银行家算法）、资源有序分配、死锁检测与恢复等。</p><h2 id="进程调度策略有哪几种" tabindex="-1">进程调度策略有哪几种？ <a class="header-anchor" href="#进程调度策略有哪几种" aria-label="Permalink to &quot;进程调度策略有哪几种？&quot;">​</a></h2><p>进程调度策略是操作系统用于管理进程执行顺序和分配 CPU 时间的方法。以下是一些常见的进程调度策略：</p><ol><li>先来先服务（First-Come, First-Served，FCFS）：按照进程到达的顺序进行调度。一旦一个进程开始执行，它将一直占用 CPU，直到完成。这种策略简单易实现，但可能导致较长的平均等待时间。</li><li>短作业优先（Shortest Job First，SJF）：根据进程的预计运行时间进行调度。具有较短运行时间的进程优先执行。这种策略可以降低平均等待时间，但需要预先知道进程的运行时间，实际中很难实现。</li><li>优先级调度（Priority Scheduling）：根据进程的优先级进行调度。优先级高的进程先执行。这种策略允许更重要的进程优先执行，但可能导致低优先级进程长时间得不到调度（饥饿现象）。</li><li>时间片轮转（Round Robin，RR）：为每个进程分配一个固定长度的时间片（或称为时间量子），然后按顺序执行。当一个进程的时间片用完时，调度器将其放到就绪队列的末尾，然后开始执行下一个进程。这种策略实现简单，公平性较好，适用于交互式系统。</li><li>多级反馈队列（Multilevel Feedback Queue）：将进程分配到不同优先级的队列中，并根据队列优先级和时间片轮转策略进行调度。这种策略可以在保证系统响应性的同时兼顾 CPU 利用率。</li></ol><p>这些进程调度策略各有优缺点，适用于不同的场景。在实际操作系统中，可能会采用混合或改进的调度策略，以满足不同需求。</p><h2 id="什么是虚拟内存" tabindex="-1">什么是虚拟内存？ <a class="header-anchor" href="#什么是虚拟内存" aria-label="Permalink to &quot;什么是虚拟内存？&quot;">​</a></h2><p>虚拟内存（Virtual Memory）是一种内存管理技术，它使得计算机能够为程序提供比实际物理内存更大的地址空间。通过虚拟内存技术，操作系统能够将程序和数据分割成多个独立的内存块（称为页面或页），并将这些内存块在需要时分别加载到物理内存中。同时，操作系统可以将不常用的内存块交换到磁盘上的一个专门区域（称为交换区或页面文件），从而腾出物理内存空间。</p><p>虚拟内存的主要优点如下：</p><ol><li>内存抽象：虚拟内存为每个进程提供了独立的地址空间，使进程可以在隔离的环境中运行，不需要关心其他进程的内存分配情况。</li><li>内存保护：由于每个进程拥有独立的地址空间，因此一个进程无法直接访问其他进程的内存，保证了内存安全。</li><li>空间扩展：虚拟内存允许程序使用比实际物理内存更大的地址空间，从而使得程序能够在物理内存有限的情况下正常运行。</li><li>内存共享：虚拟内存技术可以实现不同进程间的内存共享，例如共享库和内存映射文件等。</li><li>内存利用率提高：虚拟内存通过按需分配页面、将不常用的页面交换到磁盘等方式，提高了物理内存的利用率。</li></ol><p>虚拟内存的实现依赖于硬件支持，如内存管理单元（Memory Management Unit，MMU）等。MMU 负责将虚拟地址转换为物理地址，并在访问权限检查和页面错误处理等方面与操作系统协同工作。</p><hr>',36),t=[r];function n(d,h,s,c,p,u){return a(),l("div",null,t)}const P=i(o,[["render",n]]);export{m as __pageData,P as default};
