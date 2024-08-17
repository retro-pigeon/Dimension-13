const Group = (meshes) => {
    return {isGroup:true, position:vector3(0, 0, 0), rotation: vector3(0, 0, 0), scale: vector3(1, 1, 1), meshes:meshes};
};