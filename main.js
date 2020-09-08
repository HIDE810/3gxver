// https://hakuhin.jp/js/file_reader.html#FILE_READER_READ_AS_ARRAY_BUFFER

var input_file = document.getElementById("file");

function output(str) {
    document.getElementById("version").innerHTML = str;
}

input_file.onchange = function (){

    if(!(input_file.value)) return;
    if(!(window.FileReader)) return;
    
    var file_list = input_file.files;
    if(!file_list) return;

    var file = file_list[0];
    if(!file) return;

    var file_reader = new FileReader();
    
    const ver1 = [51, 71, 88, 36, 48, 48, 48, 49]; // 3GX$0001
    const ver2 = [51, 71, 88, 36, 48, 48, 48, 50]; // 3GX$0002

    file_reader.onload = function(e){
        
        var ary_u8 = new Uint8Array(file_reader.result);
        var type = ary_u8.slice(0, 8).toString();
        
        switch(type) {
            case ver1.toString(): output("CTRPluginFramework v0.5.1"); break;
            case ver2.toString(): output("CTRPluginFramework v0.6.0"); break;
            default: output("Error: Invalid file.");
        }
    };
    
    file_reader.readAsArrayBuffer(file);
};

