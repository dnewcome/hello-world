cmake_minimum_required(VERSION 3.1)
project(wxApp CXX)

include(CheckCXXCompilerFlag)
CHECK_CXX_COMPILER_FLAG("-std=c++11" COMPILER_SUPPORTS_CXX11)
if(COMPILER_SUPPORTS_CXX11)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
else()
  message(ERROR "The compiler ${CMAKE_CXX_COMPILER} has no C++11 support. Please use a different C++ compiler.")
endif()

set(wxWidgets_USE_LIBS)
find_package(wxWidgets)
include(${wxWidgets_USE_FILE})

include_directories(${wxWidgets_INCLUDE_DIRS})

add_executable(${PROJECT_NAME}
  src/wxapp.cpp)

target_link_libraries(${PROJECT_NAME}
  ${wxWidgets_LIBRARIES})