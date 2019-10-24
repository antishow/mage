import { Line3, Plane, Vector3, Geometry } from "three";

export function NavMesh() {
	return function(object) {
		var self = object;

		function start() {
			self.geometry = new Geometry().fromBufferGeometry(self.geometry);
		}

		return { name: 'NavMesh', start }
	}
}

export function projectPointOntoGeometry(p, geometry) {
	let ret = new Vector3();
	let lowestDistance = 1e9;

	for (var i in geometry.faces) {
		let face = geometry.faces[i];
		let cp = getClosestPointFromFaceToPoint(face, geometry, p);
		let d = p.distanceTo(cp);

		if (d < lowestDistance) {
			lowestDistance = d;
			ret.copy(cp);
		}
	}

	return ret;
}

function getClosestPointFromFaceToPoint(face, geometry, point) {
	let ret = new Vector3();
	let lowestDistance = 1e9;

	let va = geometry.vertices[face.a];
	let vb = geometry.vertices[face.b];
	let vc = geometry.vertices[face.c];

	let proj = new Vector3();
	let plane = new Plane().setFromCoplanarPoints(va, vb, vc);
	plane.projectPoint(point, proj);

	let sides = [
		new Line3(va, vb),
		new Line3(vb, vc),
		new Line3(va, vc)
	];

	for (var i in sides) {
		let side = sides[i];
		let cp = new Vector3();

		side.closestPointToPoint(proj, true, cp);
		let d = proj.distanceTo(cp);

		if (d < lowestDistance) {
			lowestDistance = d;
			ret.copy(cp);
		}
	}

	return ret;
}