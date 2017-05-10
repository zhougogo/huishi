var turnplate = {
								restaraunts: [], //大转盘奖品名称
								colors: [], //大转盘奖品区块对应背景颜色
								outsideRadius: 192, //大转盘外圆的半径
								textRadius: 155, //大转盘奖品位置距离圆心的距离
								insideRadius: 68, //大转盘内圆的半径
								startAngle: 0, //开始角度
							
								bRotate: false //false:停止;ture:旋转
							};
							
							$(document).ready(function() {
								//动态添加大转盘的奖品与奖品区域背景颜色
								turnplate.restaraunts = ["安卓/IOS两用数据线", "唇彩移动电源", "生活储物  三件套", "先知感温杯"];
								turnplate.colors = ["#ffc43e", "#F8CD5A", "#ffc43e", "#F8CD5A"];
							
								var rotateTimeOut = function() {
									$('#wheelcanvas').rotate({
										angle: 0,
										animateTo: 2160,
										duration: 8000,
										callback: function() {
											alert('网络超时，请检查您的网络设置！');
										}
									});
								};
							
								//旋转转盘 item:奖品位置; txt：提示语;
								var rotateFn = function(item, txt) {
									var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
									if(angles < 270) {
										angles = 270 - angles;
									} else {
										angles = 360 - angles + 270;
									}
									$('#wheelcanvas').stopRotate();
									$('#wheelcanvas').rotate({
										angle: 0,
										animateTo: angles + 1800,
										duration: 8000,
										callback: function() {
											//											alert(txt);
											//						turnplate.bRotate = !turnplate.bRotate;
							
											$('.page3 .popup').css('display', 'block');
							
											$('.page3 .popup .shong span').html(txt);
							
											//				alert(txt);
											//                        turnplate.bRotate = !turnplate.bRotate;
											//切换到领奖页面(czy)
											//                      $('.page7').show().siblings().hide();
							
										}
									});
								};
							
								$('.beginBtm').click(function() {
									if(turnplate.bRotate) return;
									turnplate.bRotate = !turnplate.bRotate;
									//获取随机数(奖品个数范围内)
									var item = rnd(1, turnplate.restaraunts.length);
									//              var item = rnd({{$prize}}, {{$prize}});
									//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
									rotateFn(item, turnplate.restaraunts[item - 1]);
							
								});
							
							});
							
							function rnd(n, m) {
								var random = Math.floor(Math.random() * (m - n + 1) + n);
								return random;
							
							}
							
							//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
							window.onload = function() {
								drawRouletteWheel();
							};
							
							function drawRouletteWheel() {
								var canvas = document.getElementById("wheelcanvas");
								if(canvas.getContext) {
									//根据奖品个数计算圆周角度
									var arc = Math.PI / (turnplate.restaraunts.length / 2);
									//					console.log(arc);
									var ctx = canvas.getContext("2d");
									//在给定矩形内清空一个矩形
									ctx.clearRect(0, 0, 422, 422);
									//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
									ctx.strokeStyle = "#DD7B0D";
							
									ctx.textAlign = "center";
							
									ctx.textBaseline = "middle";
							
									//font 属性设置或返回画布上文本内容的当前字体属性
									ctx.font = '24px Microsoft YaHei';
									for(var i = 0; i < turnplate.restaraunts.length; i++) {
										var angle = turnplate.startAngle + i * arc;
										ctx.fillStyle = turnplate.colors[i];
										ctx.beginPath();
										//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
										ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
										ctx.arc(211, 211, 0, 0, angle, true);
										ctx.stroke();
										ctx.fill();
										//锁画布(为了保存之前的画布状态)
										ctx.save();
							
										//----绘制奖品开始----
										ctx.fillStyle = "#E29028";
										var text = turnplate.restaraunts[i];
										var line_height = 40;
										//translate方法重新映射画布上的 (0,0) 位置 Math.sin(angle + arc / 2) * turnplate.textRadius)
										ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
										//						ctx.translate(211 + Math.sin(angle + arc / 2) * turnplate.textRadius), 211 + Math.cos(angle + arc / 2) * turnplate.textRadius;
							
										//rotate方法旋转当前的绘图
										//						console.log(angle)
										//						var num = Math.PI/180;
							
										ctx.rotate(angle + arc / 2 + Math.PI);
							
										//						ctx.rotate((i*angle+2)*num); 
										//			ctx.fillText(text, 30, 0);
										if(text.indexOf("M") > 0) { //流量包
											var texts = text.split("M");
											for(var j = 0; j < texts.length; j++) {
												//					ctx.font = j == 0 ? 'bold 40px' : '40px';
												if(j == 0) {
													ctx.fillText(texts[j] + "M", 40, j * line_height * 2 / 3);
												} else {
													ctx.fillText(texts[j], 40, j * line_height * 2 / 3);
												}
											}
										} else if(text.indexOf("M") == -1 && text.length > 4) { //奖品名称长度超过一定范围
											text = text.substring(0, 6) + "||" + text.substring(6);
											var texts = text.split("||");
											for(var j = 0; j < texts.length; j++) {
												ctx.fillText(texts[j], 40, j * line_height * 2 / 3);
											}
										} else {
											//在画布上绘制填色的文本。文本的默认颜色是黑色
											//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
											ctx.fillText(text, 40, 10);
										}
							
										//把当前画布返回（调整）到上一个save()状态之前 
										ctx.restore();
										//----绘制奖品结束----
									}
								}
							}