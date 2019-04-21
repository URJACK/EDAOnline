/**单次编译过程 持续的最长时间*/
const COMPILE_TIME = 15000;
module.exports.COMPILE_TIME = COMPILE_TIME;

/**编译文件前缀(用来生成quartus项目文件的时候的前缀内容)*/
const COMPILE_PREFIX = `set_global_assignment -name FAMILY "Cyclone IV E"
set_global_assignment -name DEVICE AUTO
set_global_assignment -name TOP_LEVEL_ENTITY NETPGM
set_global_assignment -name ORIGINAL_QUARTUS_VERSION 11.0
set_global_assignment -name PROJECT_CREATION_TIME_DATE "09:11:55  JULY 13, 2018"
set_global_assignment -name LAST_QUARTUS_VERSION 11.0
set_global_assignment -name MIN_CORE_JUNCTION_TEMP 0
set_global_assignment -name MAX_CORE_JUNCTION_TEMP 85
set_global_assignment -name STRATIX_DEVICE_IO_STANDARD "2.5 V"
`;
module.exports.COMPILE_PREFIX = COMPILE_PREFIX;

/**编译文件后缀*/
const COMPILE_POSTFIX = `
set_global_assignment -name PARTITION_NETLIST_TYPE SOURCE -section_id Top
set_global_assignment -name PARTITION_FITTER_PRESERVATION_LEVEL PLACEMENT_AND_ROUTING -section_id Top
set_global_assignment -name PARTITION_COLOR 16764057 -section_id Top
set_global_assignment -name VERILOG_FILE NETPGM.v
set_instance_assignment -name PARTITION_HIERARCHY root_partition -to | -section_id Top`;
module.exports.COMPILE_POSTFIX = COMPILE_POSTFIX;

/**项目的名称*/
const NAME_PROJECT = `NETPGM`;
module.exports.NAME_PROJECT = NAME_PROJECT;

/**项目的路径*/
const PATH_PROJECT = `F:\\quartusProjects\\NETPGM\\NETPGM`;
module.exports.PATH_PROJECT = PATH_PROJECT;

/**编译生成的 SOF 文件路径*/
const PATH_SOF = `"p;F:\\quartusProjects\\NETPGM\\NETPGM.sof"`;
module.exports.PATH_SOF = PATH_SOF;

/**编译 代码文件 的路径*/
const PATH_CODE = `F:\\quartusProjects\\NETPGM\\NETPGM.v`;
module.exports.PATH_CODE = PATH_CODE;

/**编译 项目配置文件的 路径 */
const PATH_PROJCONF = `F:\\quartusProjects\\NETPGM\\NETPGM.qsf`;
module.exports.PATH_PROJCONF = PATH_PROJCONF;