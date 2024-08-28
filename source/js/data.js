// Here we can include all of our raw data

// let level = {"vertices":[-403,200,-400,-403,0,-400,-110,200,-400,-110,0,-400,-110,102,-400,0,199,-400,-75,153,-400,-39,168,-400,0,170,-400,-110,200,-699,-110,0,-699,-110,102,-700,0,199,-699,-75,154,-700,-39,169,-700,0,170,-700,-270,200,-699,-270,0,-699,-270,200,-1200,-270,0,-1200,0,0,0,-1200,0,-1199,0,0,-1200,0,200,0,-1200,199,-1199,0,199,-1200],"normals":[],"indices":[0,3,1,9,15,14,6,11,13,7,13,14,8,14,15,4,10,11,2,7,5,16,19,17,9,17,10,20,22,21,23,25,24,0,2,3,13,11,9,9,12,15,14,13,9,6,4,11,7,6,13,8,7,14,4,3,10,2,4,6,7,8,5,2,6,7,16,18,19,9,16,17,19,25,22,19,18,25],"colors":[["#6C6367",26]]};
let gem = { "vertices": [0, 0, -150, -86, 0, -75, -86, 0, 75, 0, 0, 150, 86, 0, 75, 86, 0, -75, 0, 50, -96, -55, 50, -48, -55, 50, 48, 0, 50, 96, 55, 50, 48, 55, 50, -48, 0, -50, -96, -55, -50, -48, -55, -50, 48, 0, -50, 96, 55, -50, 48, 55, -50, -48], "normals": [], "indices": [4, 9, 3, 2, 7, 1, 5, 10, 4, 3, 8, 2, 1, 6, 0, 0, 11, 5, 8, 10, 6, 15, 4, 3, 1, 14, 2, 4, 17, 5, 2, 15, 3, 12, 1, 0, 5, 12, 0, 12, 16, 14, 4, 10, 9, 2, 8, 7, 5, 11, 10, 3, 9, 8, 1, 7, 6, 0, 6, 11, 6, 7, 8, 8, 9, 10, 10, 11, 6, 15, 16, 4, 1, 13, 14, 4, 16, 17, 2, 14, 15, 12, 13, 1, 5, 17, 12, 14, 13, 12, 12, 17, 16, 16, 15, 14], "colors": [["#80D08C", 32]] };
let spider_body = { "vertices": [-91, 208, 125, -91, 338, -4, -91, 78, -4, -206, 208, -257, 0, 208, 154, 0, 367, -4, -112, 288, 75, -112, 129, 75, -124, 295, -67, -124, 120, -67, 0, 50, -4, -202, 212, -397, 0, 318, 104, -154, 208, -4, 0, 87, -100, 0, 99, 104, 0, 328, -100, -107, 296, -582, -88, 220, -631, -107, 144, -582, 0, 220, -658, 0, 115, -611, 0, 325, -611, -150, 345, -261, 0, 395, -312, 0, 28, -312, -188, 78, -261], "normals": [], "indices": [12, 1, 6, 12, 0, 4, 0, 13, 7, 1, 13, 6, 8, 9, 13, 13, 2, 7, 2, 14, 10, 11, 17, 18, 0, 15, 4, 2, 15, 7, 24, 17, 23, 1, 16, 8, 18, 21, 19, 18, 22, 20, 11, 19, 26, 25, 19, 21, 14, 26, 25, 3, 26, 9, 16, 23, 8, 3, 23, 11, 12, 5, 1, 12, 6, 0, 0, 6, 13, 1, 8, 13, 8, 3, 9, 13, 9, 2, 2, 9, 14, 11, 23, 17, 0, 7, 15, 2, 10, 15, 24, 22, 17, 1, 5, 16, 18, 20, 21, 18, 17, 22, 11, 18, 19, 25, 26, 19, 14, 9, 26, 3, 11, 26, 16, 24, 23, 3, 8, 23], "colors": [["#442424", 40]] };
let spider_leg = { "vertices": [-328, 194, -200, -326, 234, -200, -324, 194, -160, -322, 234, -160, -167, 165, -168, -161, 223, -168, -172, 165, -221, -166, 223, -222, -442, 195, -185, -450, 227, -184, -439, 195, -153, -446, 227, -152, -569, 143, -170, -589, 161, -168, -567, 143, -144, -586, 161, -142, -627, 0, -158, -640, 5, -157, -625, 0, -144, -639, 5, -143], "normals": [], "indices": [5, 2, 4, 3, 10, 2, 2, 6, 4, 5, 1, 3, 0, 7, 6, 11, 14, 10, 1, 8, 9, 2, 8, 0, 1, 11, 3, 13, 19, 15, 9, 12, 13, 10, 12, 8, 9, 15, 11, 14, 19, 18, 12, 17, 13, 14, 16, 12, 5, 3, 2, 3, 11, 10, 2, 0, 6, 5, 7, 1, 0, 1, 7, 11, 15, 14, 1, 0, 8, 2, 10, 8, 1, 9, 11, 13, 17, 19, 9, 8, 12, 10, 14, 12, 9, 13, 15, 14, 15, 19, 12, 16, 17, 14, 18, 16], "colors": [["#5d5775", 32]] };
let cube = { "vertices": [0, -26, -200, 84, -26, -97, 226, -26, 0, 84, -26, 97, 0, -26, 200, -84, -26, 97, -173, -26, 0, -84, -26, -97, 0, 1015, 0], "normals": [], "indices": [0, 8, 1, 1, 8, 2, 2, 8, 3, 3, 8, 4, 4, 8, 5, 5, 8, 6, 6, 8, 7, 7, 8, 0], "colors": [["#247BA0", 8]] };
let plane = { "vertices": [-100, 0, 100, 100, 0, 100, -100, 0, -100, 100, 0, -100], "normals": [], "indices": [1, 2, 0, 1, 3, 2], "colors": [["#70C1B3", 2]] };
let circle = {"vertices":[-70,0,70,-100,0,0,-100,23,0,-70,23,70,0,0,0,0,23,0,-35,0,35,-50,0,0,-50,23,0,-35,23,35,-82,0,82,-116,0,0,-116,13,0,-82,13,82],"normals":[],"indices":[5,3,9,3,4,5,3,6,0,5,1,2,8,6,9,1,8,2,2,9,3,1,12,11,0,13,3,3,12,2,13,11,12,8,2,5,9,8,5,3,0,4,3,9,6,5,4,1,8,7,6,1,7,8,2,8,9,1,2,12,0,10,13,3,13,12,13,10,11],"colors":[["#778899",23]]};
let star = { "vertices": [0, 0, -100, -86, 0, 50, 86, 0, 50, 0, 0, 100, 86, 0, -50, -86, 0, -50], "normals": [], "indices": [4, 5, 3, 1, 2, 0], "colors": [["#FFFFFF", 2]] };
let sun = {"vertices":[0,0,-100,-28,0,-95,-54,0,-84,-75,0,-65,-90,0,-41,-98,0,-14,-98,0,14,-90,0,41,-75,0,65,-54,0,84,-28,0,95,0,0,99,28,0,95,54,0,84,75,0,65,90,0,41,98,0,14,98,0,-14,90,0,-41,75,0,-65,54,0,-84,28,0,-95],"normals":[],"indices":[2,21,0,0,1,2,2,20,21,5,18,3,3,4,5,5,17,18,18,19,3,8,15,6,6,7,8,8,14,15,15,16,6,11,13,9,9,10,11,11,12,13],"colors":[["#E87C00",3],["#E85F5A",4],["#E81F67",4],["#E700B5",3]]};
let ray = {"vertices":[-92,-2,-38,12,197,99,-83,2,-55,-6,202,99,-21,164,97,-53,131,84,-79,97,60,-95,64,29,-99,31,-4,-40,168,91,-68,135,72,-89,102,44,-99,68,11,-97,35,-23],"normals":[],"indices":[0,13,2,7,11,12,5,9,10,0,8,13,7,6,11,5,4,9,4,3,9,8,12,13,6,10,11,4,1,3,8,7,12,6,5,10],"colors":[["#73E1E733",6],["#50BEEF22",6]]};
let ufo = {"vertices":[0,1950,0,-578,2156,0,-408,2156,408,0,2156,0,-460,1806,460,-650,1806,0,0,1806,0,-358,2446,367,-506,2480,0,0,2337,0,-151,2718,0,-107,2685,132,0,2608,0,0,2718,0,-1237,1973,0,-1236,1930,0,-1240,1950,0,-874,1930,874,-875,1973,875,-877,1950,877,-1374,0,0,-971,0,971],"normals":[],"indices":[3,7,9,1,9,8,1,7,2,9,11,12,9,10,8,8,11,7,10,12,13,12,11,13,11,10,13,5,4,6,4,20,5,3,2,7,1,3,9,1,8,7,9,7,11,9,12,10,8,10,11,4,21,20,16,3,1,19,6,4,19,2,3,16,5,6,15,4,5,14,15,16,17,18,19,15,18,17,18,1,2,1,14,16,16,0,3,4,17,19,19,0,6,3,0,19,19,18,2,6,0,16,16,15,5,15,17,4,15,14,18,18,14,1],"colors":[["#10E70022",18],["#6FB2BE",20]]};
let mine = {"vertices":[-70,0,70,0,0,100,0,0,0,-56,-16,56,0,-16,80,0,-16,44,-31,-16,31,0,-9,44,-31,-9,31,0,-9,0],"normals":[],"indices":[7,9,8,4,6,3,0,4,3,5,8,6,4,5,6,0,1,4,5,7,8],"colors":[["#E7000E",1],["#E7B500",6]]};
let particle = {"vertices":[0,-70,-100,86,-70,50,-86,-70,50,0,70,0],"normals":[],"indices":[0,3,1,0,1,2,1,3,2,2,3,0],"colors":[["#FFFFFF",4]]};