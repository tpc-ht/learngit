import vue from 'Vue';
let fl = {
	mbs(data){
		if(!data){
			return 0;
		}
		return data;
	},
	resellerLevel(i){
		let te = '';
		if(i==0){
			te = '普通会员';
		}else if(i==1){
			te = '区代';
		}else if(i==2){
			te = '市代';
		}else if(i==3){
			te = '省代';
		}
		return te;
	}
}
export default fl;